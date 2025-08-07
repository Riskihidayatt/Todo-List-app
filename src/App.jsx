import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data
  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456&current_weather=true"
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather))
      .catch((err) => console.log("Weather fetch failed:", err));
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
          category: "Work",
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#f5f6fa",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "white",
          padding: "16px 24px",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, color: "#1e293b" }}>BPM Todo App</h1>
        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              padding: "8px 12px",
              backgroundColor: "#f1f5f9",
              borderRadius: "6px",
            }}
          >
            🕐 {time.toLocaleTimeString()}
          </div>
          {weather && (
            <div
              style={{
                padding: "8px 12px",
                backgroundColor: "#f1f5f9",
                borderRadius: "6px",
              }}
            >
              🌤️ {Math.round(weather.temperature)}°C
            </div>
          )}
        </div>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "280px",
            backgroundColor: "white",
            padding: "24px",
            borderRight: "1px solid #e2e8f0",
          }}
        >
          <h3>Filters</h3>
          <div style={{ marginBottom: "16px" }}>
            <label>Status: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "24px" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <h2>My Todos ({filteredTodos.length})</h2>
            </div>

            {/* Add Todo Form */}
            <div style={{ marginBottom: "24px", display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo..."
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              />
              <button
                onClick={addTodo}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Add Todo
              </button>
            </div>

            {/* Todo List */}
            <div>
              {filteredTodos.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#64748b",
                    padding: "40px",
                  }}
                >
                  No todos found. Start by adding a new todo!
                </p>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "16px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      backgroundColor: todo.completed ? "#f8fafc" : "white",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      style={{ marginRight: "12px" }}
                    />
                    <span
                      style={{
                        flex: 1,
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                        color: todo.completed ? "#64748b" : "#1e293b",
                      }}
                    >
                      {todo.text}
                    </span>
                    <span
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        borderRadius: "4px",
                        fontSize: "12px",
                        marginRight: "8px",
                      }}
                    >
                      {todo.category}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
