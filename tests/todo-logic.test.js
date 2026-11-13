import { describe, it, expect } from "vitest";
import { addTodo, toggleTodo, deleteTodo, filterTodos } from "../js/todo-logic.js";

describe("todo-logic pure functions", () => {
  it("adds a new todo item and proves immutability (original array unchanged)", () => {
    const original = [{ id: "1", text: "Learn JavaScript", completed: false }];
    const result = addTodo(original, "Write unit tests");

    expect(result.length).toBe(2);
    expect(result[1].text).toBe("Write unit tests");
    expect(original.length).toBe(1); // Original array was not mutated
  });

  it("handles edge case: ignores empty or whitespace-only text when adding", () => {
    const original = [{ id: "1", text: "Learn JavaScript", completed: false }];
    const result = addTodo(original, "   ");

    expect(result).toEqual(original);
  });

  it("toggles the completed status of a todo by id", () => {
    const original = [{ id: "1", text: "Learn JavaScript", completed: false }];
    const result = toggleTodo(original, "1");

    expect(result[0].completed).toBe(true);
    expect(original[0].completed).toBe(false); // Immutability check
  });

  it("deletes a todo by id and handles non-existent IDs gracefully", () => {
    const original = [
      { id: "1", text: "Task A", completed: false },
      { id: "2", text: "Task B", completed: true }
    ];
    
    // Successful deletion
    const result = deleteTodo(original, "1");
    expect(result.length).toBe(1);
    expect(result[0].id).toBe("2");

    // Non-existent ID edge case
    const noChange = deleteTodo(original, "999");
    expect(noChange).toEqual(original);
  });

  it("filters todos correctly by 'all', 'active', and 'completed'", () => {
    const todos = [
      { id: "1", text: "Active Task", completed: false },
      { id: "2", text: "Done Task", completed: true }
    ];

    expect(filterTodos(todos, "active").length).toBe(1);
    expect(filterTodos(todos, "active")[0].text).toBe("Active Task");

    expect(filterTodos(todos, "completed").length).toBe(1);
    expect(filterTodos(todos, "completed")[0].text).toBe("Done Task");

    expect(filterTodos(todos, "all").length).toBe(2);
  });
});