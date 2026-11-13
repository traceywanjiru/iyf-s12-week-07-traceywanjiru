import { saveToStorage, getFromStorage } from "./storage.js";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodoText,
  clearCompletedTodos
} from "./todo-logic.js";
import { render } from "./ui.js";

const STORAGE_KEY = "todos";
const FILTER_KEY = "filter";

// 1. Load ONCE at startup
export const state = {
  todos: getFromStorage(STORAGE_KEY, []),
  currentFilter: getFromStorage(FILTER_KEY, "all")
};

// 2. Single place that saves and redraws
function commit() {
  saveToStorage(STORAGE_KEY, state.todos);
  saveToStorage(FILTER_KEY, state.currentFilter);
  render(state);
}

// 3. Actions
export function handleAdd(text) {
  state.todos = addTodo(state.todos, text);
  commit();
}

export function handleToggle(id) {
  state.todos = toggleTodo(state.todos, id);
  commit();
}

export function handleDelete(id) {
  state.todos = deleteTodo(state.todos, id);
  commit();
}

export function handleEdit(id, newText) {
  state.todos = updateTodoText(state.todos, id, newText);
  commit();
}

export function handleClearCompleted() {
  state.todos = clearCompletedTodos(state.todos);
  commit();
}

export function handleFilter(filter) {
  state.currentFilter = filter;
  commit();
}