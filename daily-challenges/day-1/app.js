const THEME_KEY = "user_theme";
const themeToggleBtn = document.getElementById("theme-toggle");

// 1. Apply theme on initial page load (prevents flashing)
const savedTheme = localStorage.getItem(THEME_KEY) || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
updateButtonText(savedTheme);

// 2. Handle toggle click
themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    updateButtonText(newTheme);
});

function updateButtonText(theme) {
    themeToggleBtn.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}