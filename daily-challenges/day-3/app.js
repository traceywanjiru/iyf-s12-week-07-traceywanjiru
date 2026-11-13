const form = document.getElementById("auto-save-form");
const usernameInput = document.getElementById("username");
const feedbackInput = document.getElementById("feedback");
const saveStatus = document.getElementById("save-status");

const STORAGE_KEY = "day3_form_draft";

// 1. Recover data on page load
function loadDraft() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;

    try {
        const { username, feedback } = JSON.parse(savedData);
        usernameInput.value = username || "";
        feedbackInput.value = feedback || "";
    } catch {
        // Fallback if JSON parsing fails
    }
}

// 2. Save data function
function saveDraft() {
    const data = {
        username: usernameInput.value,
        feedback: feedbackInput.value,
        timestamp: new Date().toLocaleTimeString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    saveStatus.textContent = `Draft saved at ${data.timestamp}`;
}

// Initialize load
loadDraft();

// 3. Auto-save interval every 5 seconds (5000 milliseconds)
setInterval(() => {
    saveDraft();
}, 5000);

// 4. Clear saved data on submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.removeItem(STORAGE_KEY);
    saveStatus.textContent = "Submitted successfully! Draft cleared.";
    form.reset();
});