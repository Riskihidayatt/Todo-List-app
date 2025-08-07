import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { reorderTodos } from "../../store/slices/todoSlice";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import LoadingSpinner from "../Common/LoadingSpinner";
import Modal from "../Common/Modal";
import "./TodoList.css";

const SortableTodoItem = ({ todo }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TodoItem
        todo={todo}
        provided={{ innerRef: setNodeRef }}
        snapshot={{ isDragging }}
      />
    </div>
  );
};

const TodoList = () => {
  const dispatch = useDispatch();
  const { items: todos, loading, filter } = useSelector((state) => state.todos);
  const [showForm, setShowForm] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesStatus =
        filter.status === "all" ||
        (filter.status === "completed" && todo.completed) ||
        (filter.status === "pending" && !todo.completed);

      const matchesCategory =
        filter.category === "all" || todo.category === filter.category;

      const matchesSearch =
        filter.searchKeyword === "" ||
        todo.title.toLowerCase().includes(filter.searchKeyword.toLowerCase()) ||
        todo.description
          .toLowerCase()
          .includes(filter.searchKeyword.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [todos, filter]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);

      const newTodos = arrayMove(todos, oldIndex, newIndex);
      dispatch(reorderTodos(newTodos));
    }
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list-header">
        <h2>My Todos ({filteredTodos.length})</h2>
        <button className="add-todo-btn" onClick={() => setShowForm(true)}>
          + Add Todo
        </button>
      </div>

      {loading && <LoadingSpinner />}

      {filteredTodos.length === 0 && !loading ? (
        <div className="empty-state">
          <p>No todos found. Start by adding a new todo!</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredTodos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="todo-list">
              {filteredTodos.map((todo) => (
                <SortableTodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <TodoForm onClose={() => setShowForm(false)} />
        </Modal>
      )}
    </div>
  );
};

export default TodoList;
