import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleTodoComplete,
  deleteTodoRequest,
  updateTodoRequest,
} from "../../store/slices/todoSlice";
import "./TodoItem.css";

const TodoItem = ({ todo, provided, snapshot }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
  });

  const handleToggleComplete = () => {
    dispatch(toggleTodoComplete(todo.id));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      dispatch(deleteTodoRequest(todo.id));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editData.title.trim()) {
      dispatch(
        updateTodoRequest({
          ...todo,
          title: editData.title,
          description: editData.description,
        })
      );
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      title: todo.title,
      description: todo.description,
    });
    setIsEditing(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Work: "#3498db",
      Personal: "#2ecc71",
      Shopping: "#f39c12",
      Health: "#e74c3c",
    };
    return colors[category] || "#95a5a6";
  };

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className={`todo-item ${todo.completed ? "completed" : ""} ${
        snapshot?.isDragging ? "dragging" : ""
      }`}
    >
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
        />
      </div>

      <div className="todo-content">
        {isEditing ? (
          <div className="todo-edit-form">
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="edit-title"
            />
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="edit-description"
              rows={2}
            />
            <div className="edit-actions">
              <button onClick={handleSaveEdit} className="save-btn">
                Save
              </button>
              <button onClick={handleCancelEdit} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="todo-display">
            <h4 className="todo-title">{todo.title}</h4>
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
            <div className="todo-meta">
              <span
                className="todo-category"
                style={{ backgroundColor: getCategoryColor(todo.category) }}
              >
                {todo.category}
              </span>
              <span className="todo-date">
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {!isEditing && (
          <>
            <button onClick={handleEdit} className="edit-btn">
              Edit
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
