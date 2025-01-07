import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.error = null;
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
      state.isLoading = false;
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload,
        };
      }
      state.isLoading = false;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearTodos: (state) => {
      state.todos = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  setLoading,
  setError,
  clearTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
