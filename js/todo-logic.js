export function addTodo(todos, text) {
  if (!text.trim()) return todos;
  const newTodo = {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false
  };
  return [...todos, newTodo];
}

export function toggleTodo(todos, id) {
  return todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t));
}

export function deleteTodo(todos, id) {
  return todos.filter(t => t.id !== id);
}

export function updateTodoText(todos, id, newText) {
  if (!newText.trim()) return todos;
  return todos.map(t => (t.id === id ? { ...t, text: newText.trim() } : t));
}

export function clearCompletedTodos(todos) {
  return todos.filter(t => !t.completed);
}

export function filterTodos(todos, filter) {
  if (filter === "active") return todos.filter(t => !t.completed);
  if (filter === "completed") return todos.filter(t => t.completed);
  return todos; // "all"
}