import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../store/slices/todoSlice";
import TodoFilters from "../Todo/TodoFilters";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { filter } = useSelector((state) => state.todos);

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilter({ [filterType]: value }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Filters</h3>
        <TodoFilters
          filter={filter}
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
