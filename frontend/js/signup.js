console.log("signup.js loaded");

function signup() {
    console.log("button clicked");

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let role = document.getElementById("role").value;

    let emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!emailPattern.test(email)) {
        alert("Enter valid email");
        return;
    }

    if (!passwordPattern.test(password)) {
        alert(
            "Password must contain:\n" +
            "• 8 characters\n" +
            "• Uppercase letter\n" +
            "• Lowercase letter\n" +
            "• Number\n" +
            "• Special character"
        );
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (role === "") {
        alert("Select role");
        return;
    }

    fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            role: role
        })
    })
    .then(response => response.json())
    .then(data => {

        alert(data.message);

        if (data.message === "Signup Successful") {
            window.location.href = "login.html";
        }

    })
    .catch(error => {
        console.error(error);
        alert("Server Error");
    });
}