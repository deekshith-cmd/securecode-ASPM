const API = "/api/auth";

function showRegister() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
    document.getElementById("loginMessage").textContent = "";
}

function showLogin() {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
    document.getElementById("registerMessage").textContent = "";
}

// REGISTER
document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const message = document.getElementById("registerMessage");

    if (username.length < 3) {
        message.textContent = "Username must be at least 3 characters.";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        message.textContent = "Enter a valid email address.";
        return;
    }

    if (password.length < 8) {
        message.textContent = "Password must be at least 8 characters.";
        return;
    }

    message.textContent = "Creating account...";

    try {
        const response = await fetch(`${API}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message || "Registration failed.";
            return;
        }

        message.textContent = "Account created successfully!";
        document.getElementById("registerForm").reset();

        setTimeout(showLogin, 1000);
    } catch (error) {
        message.textContent = "Cannot connect to server.";
        console.error(error);
    }
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const usernameOrEmail =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");

    if (!usernameOrEmail || !password) {
        message.textContent = "Enter username/email and password.";
        return;
    }

    message.textContent = "Logging in...";

    try {
        const response = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: usernameOrEmail,
                username: usernameOrEmail,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message || "Login failed.";
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        message.textContent = "Login successful!";

        setTimeout(() => {
            window.location.href = "/dashboard.html";
        }, 700);

    } catch (error) {
        message.textContent = "Cannot connect to server.";
        console.error(error);
    }
});