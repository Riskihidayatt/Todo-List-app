import "./TodoFilters.css";

const TodoFilters = ({ filter, categories, onFilterChange }) => {
  return (
    <div className="todo-filters">
      <div className="filter-group">
        <label htmlFor="status-filter">Status:</label>
        <select
          id="status-filter"
          value={filter.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category-filter">Category:</label>
        <select
          id="category-filter"
          value={filter.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="search-input">Search:</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search todos..."
          value={filter.searchKeyword}
          onChange={(e) => onFilterChange("searchKeyword", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TodoFilters;
