const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");
const successMsg = document.getElementById("success-msg");

// Loop through each input to restore saved values and attach listeners
inputs.forEach(input => {
    // 1. Load saved value on page load from sessionStorage
    const saved = sessionStorage.getItem(`form_${input.name}`);
    if (saved) {
        input.value = saved;
    }

    // 2. Save value into sessionStorage as the user types
    input.addEventListener("input", () => {
        sessionStorage.setItem(`form_${input.name}`, input.value);
        successMsg.classList.add("hidden"); // Hide success banner if editing again
    });
});

// 3. Clear sessionStorage backup keys upon successful form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    inputs.forEach(input => {
        sessionStorage.removeItem(`form_${input.name}`);
        input.value = ""; // Clear input fields
    });

    successMsg.classList.remove("hidden");
});