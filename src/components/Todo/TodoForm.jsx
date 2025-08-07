import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoRequest } from "../../store/slices/todoSlice";
import LoadingSpinner from "../Common/LoadingSpinner";
import "./TodoForm.css";

const TodoForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { loading } = useSelector((state) => state.todos);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Work",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      dispatch(addTodoRequest(formData));
      setFormData({ title: "", description: "", category: "Work" });
      if (onClose) onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter todo title..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description..."
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner size="small" /> : "Add Todo"}
        </button>
        {onClose && (
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
