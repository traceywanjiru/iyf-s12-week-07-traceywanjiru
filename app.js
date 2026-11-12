// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let todos = [];
let currentFilter = "all";

// Functions
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id;

    const span = document.createElement("span");
    span.textContent = todo.text;

    // Bonus: Double-click to edit task text
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
                todo.text = newText;
            }
            renderTodos();
        }

        editInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                saveEdit();
            } else if (e.key === "Escape") {
                renderTodos();
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

    return li;
}

function renderTodos() {
    todoList.innerHTML = "";

    // Filter todos based on currentFilter
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true; // "all"
    });

    filteredTodos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });

    updateStats();
}

function addTodo(text) {
    if (!text.trim()) return;

    const newTodo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false
    };

    todos.push(newTodo);
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function updateStats() {
    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? "" : "s"} left`;
}

function filterTodos(filter) {
    currentFilter = filter;
    
    // Update active class on filter buttons
    filters.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    renderTodos();
}

// Event Listeners
form.addEventListener("submit", function(event) {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
});

// Event Delegation for clicking on tasks (toggle or delete)
todoList.addEventListener("click", function(event) {
    const li = event.target.closest(".todo-item");
    if (!li) return;

    const id = li.dataset.id;

    if (event.target.classList.contains("delete-btn")) {
        deleteTodo(id);
    } else {
        toggleTodo(id);
    }
});

// Filter button event listeners
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filterTodos(btn.dataset.filter);
    });
});

// Clear completed tasks
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    renderTodos();
});

// Initial render
renderTodos();