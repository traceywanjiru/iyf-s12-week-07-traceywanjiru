import { filterTodos } from "./todo-logic.js";
import { handleEdit } from "./state.js";

export function render(state) {
    const todoList = document.getElementById("todo-list");
    const itemsLeft = document.getElementById("items-left");
    const filters = document.querySelectorAll(".filter");

    // Update filter buttons active class
    filters.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === state.currentFilter);
    });

    // Update stats
    if (itemsLeft) {
        const activeCount = state.todos.filter((t) => !t.completed).length;
        itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? "" : "s"} left`;
    }

    if (!todoList) {
        return;
    }
    todoList.innerHTML = "";

    const visibleTodos = filterTodos(state.todos, state.currentFilter);

    visibleTodos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id;

        const span = document.createElement("span");
        span.textContent = todo.text;

        // Double-click to edit task text (from your Week 5 code)
        span.addEventListener("dblclick", () => {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = todo.text;
            editInput.className = "edit-input";
            editInput.style.flex = "1";
            editInput.style.padding = "4px 8px";

            li.replaceChild(editInput, span);
            editInput.focus();

            function saveEdit() {
                const newText = editInput.value.trim();
                if (newText) {
                    handleEdit(todo.id, newText);
                } else {
                    render(state);
                }
            }

            editInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    saveEdit();
                } else if (e.key === "Escape") {
                    render(state);
                }
            });

            editInput.addEventListener("blur", saveEdit);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "×";
        deleteBtn.title = "Delete task";

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}
