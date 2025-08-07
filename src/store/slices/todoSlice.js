import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  filter: {
    status: "all", // all, completed, pending
    category: "all",
    searchKeyword: "",
  },
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Add todo actions
    addTodoRequest: (state, action) => {
      state.loading = true;
    },
    addTodoSuccess: (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
    },
    addTodoFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Update todo actions
    updateTodoRequest: (state, action) => {
      state.loading = true;
    },
    updateTodoSuccess: (state, action) => {
      const index = state.items.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.loading = false;
    },
    updateTodoFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Delete todo actions
    deleteTodoRequest: (state, action) => {
      state.loading = true;
    },
    deleteTodoSuccess: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
      state.loading = false;
    },
    deleteTodoFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Toggle complete
    toggleTodoComplete: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    // Reorder todos
    reorderTodos: (state, action) => {
      state.items = action.payload;
    },

    // Filter actions
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
  toggleTodoComplete,
  reorderTodos,
  setFilter,
  clearError,
} = todoSlice.actions;

export default todoSlice.reducer;
