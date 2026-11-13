const STORAGE_KEY = "daily_notes_app";

// --- Exercise 3 Helper Functions ---
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    if (data === null) return defaultValue;
    try {
        return JSON.parse(data);
    } catch {
        return defaultValue; // Fallback if data is corrupted
    }
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// --- App State ---
let notes = getFromStorage(STORAGE_KEY, []);

// --- DOM Elements ---
const form = document.getElementById("note-form");
const input = document.getElementById("note-input");
const container = document.getElementById("notes-container");

// --- Render Function ---
function renderNotes() {
    container.innerHTML = "";

    if (notes.length === 0) {
        container.innerHTML = `<p style="color: #64748b; text-align: center;">No notes saved yet.</p>`;
        return;
    }

    notes.forEach((noteText, index) => {
        const card = document.createElement("div");
        card.className = "note-card";

        const textEl = document.createElement("div");
        textEl.className = "note-text";
        textEl.textContent = noteText;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteNote(index);
        });

        card.appendChild(textEl);
        card.appendChild(deleteBtn);
        container.appendChild(card);
    });
}

// --- Actions ---
function addNote(text) {
    notes.push(text);
    saveToStorage(STORAGE_KEY, notes);
    renderNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveToStorage(STORAGE_KEY, notes);
    renderNotes();
}

// --- Event Listeners ---
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addNote(text);
    input.value = "";
});

// --- Initial Load ---
renderNotes();