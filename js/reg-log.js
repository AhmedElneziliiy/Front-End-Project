const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const switchFormBtn = document.getElementById("switchFormBtn");

// Toggle between forms
registerBtn.addEventListener("click", () => container.classList.add("active"));
loginBtn.addEventListener("click", () => container.classList.remove("active"));
switchFormBtn.addEventListener("click", () => {
    if (container.classList.contains("active")) {
        container.classList.remove("active");
        switchFormBtn.textContent = "Switch to Sign Up";
    } else {
        container.classList.add("active");
        switchFormBtn.textContent = "Switch to Sign In";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById("form");
    const loginForm = document.querySelector(".sign-in form");

    // Set initial button text based on default view
    if (!container.classList.contains("active")) {
        switchFormBtn.textContent = "Switch to Sign Up";
    }

    // Registration Form
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = regForm.querySelector("#name").value.trim();
            const email = regForm.querySelector("#email").value.trim();
            const password = regForm.querySelector("#password").value.trim();
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Basic validation
            if (!name || name.length < 3) return alert("Name must be at least 3 characters");
            if (!email || !isValidEmail(email)) return alert("Please enter a valid email");
            if (!password || password.length < 6) return alert("Password must be at least 6 characters");

            // Check if email already exists
            if (users.some(user => user.email === email)) {
                return alert("Email already exists! Please use a different email or login.");
            }

            // Add new user and switch to login
            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            regForm.reset();
            container.classList.remove("active");
            switchFormBtn.textContent = "Switch to Sign Up";
            alert("Registration successful! Please login.");
        });
    }

    // Login Form
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector("input[type='email']").value.trim();
            const password = loginForm.querySelector("input[type='password']").value.trim();
            const users = JSON.parse(localStorage.getItem('users')) || [];

            if (!email || !password) return alert("Please fill in all fields");
            
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                alert("Login successful! Redirecting...");
                setTimeout(() => window.location.href = 'index.html', 1000);
            } else {
                alert("Invalid email or password");
                loginForm.querySelector("input[type='password']").value = '';
            }
        });
    }
});
// Simple email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}