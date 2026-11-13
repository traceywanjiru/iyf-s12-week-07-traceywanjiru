const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const historyDropdown = document.getElementById("history-dropdown");
const searchResult = document.getElementById("search-result");

const STORAGE_KEY = "day2_recent_searches";
const MAX_HISTORY = 5;

// Load history from localStorage safely
function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

// Save history array to localStorage
function saveHistory(history) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// Add query to recent searches (keeps last 5, eliminates duplicates)
function addSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) return;

    let history = getHistory();
    // Remove if it already exists so we can move it to the top
    history = history.filter(item => item.toLowerCase() !== trimmed.toLowerCase());
    // Add to the beginning of the list
    history.unshift(trimmed);
    // Keep only the last 5 items
    if (history.length > MAX_HISTORY) {
        history.pop();
    }

    saveHistory(history);
}

// Render the dropdown list
function renderDropdown() {
    const history = getHistory();
    if (history.length === 0) {
        historyDropdown.classList.add("hidden");
        return;
    }

    historyDropdown.innerHTML = `
        <div class="dropdown-header">Recent Searches</div>
        ${history.map(item => `<li data-query="${item}">${item}</li>`).join("")}
    `;
    historyDropdown.classList.remove("hidden");
}

// Perform the search action
function performSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) return;

    addSearch(trimmed);
    searchInput.value = trimmed;
    historyDropdown.classList.add("hidden");

    searchResult.innerHTML = `
        <p><strong>Showing results for:</strong> "${trimmed}"</p>
    `;
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    performSearch(searchInput.value);
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        performSearch(searchInput.value);
    }
});

// Show history dropdown when focusing input
searchInput.addEventListener("focus", () => {
    if (getHistory().length > 0) {
        renderDropdown();
    }
});

// Click a history item to search again
historyDropdown.addEventListener("click", (e) => {
    const li = e.target.closest("li[data-query]");
    if (!li) return;
    performSearch(li.dataset.query);
});

// Hide dropdown when clicking outside search wrapper
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrapper")) {
        historyDropdown.classList.add("hidden");
    }
});