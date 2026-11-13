import {
  state,
  handleAdd,
  handleToggle,
  handleDelete,
  handleClearCompleted,
  handleFilter
} from "./state.js";
import { render } from "./ui.js";

// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// Event Listeners
form.addEventListener("submit", function(event) {
    event.preventDefault();
    handleAdd(input.value);
    input.value = "";
});

// Event Delegation for clicking on tasks (toggle or delete)
todoList.addEventListener("click", function(event) {
    const li = event.target.closest(".todo-item");
    if (!li) return;

    const id = li.dataset.id;

    if (event.target.classList.contains("delete-btn")) {
        handleDelete(id);
    } else if (!event.target.classList.contains("edit-input")) {
        handleToggle(id);
    }
});

// Filter button event listeners
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        handleFilter(btn.dataset.filter);
    });
});

// Clear completed tasks
clearCompletedBtn.addEventListener("click", () => {
    handleClearCompleted();
});

// Initial render on startup
render(state);