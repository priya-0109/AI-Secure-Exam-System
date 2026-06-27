function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    let emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    if (role === "") {
        alert("Please select a role");
        return;
    }

    fetch("http://127.0.0.1:5000/login", {
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

        if (data.message === "Login Successful") {

            alert("Login Successful");

            if (role === "faculty") {
                window.location.href = "faculty-dashboard.html";
            }
            else if (role === "paper_setter") {
                window.location.href = "paper-setter-dashboard.html";
            }
            else if (role === "high_authority") {
                window.location.href = "authority-dashboard.html";
            }
            else if (role === "admin") {
                window.location.href = "admin-dashboard.html";
            }

        } else {
            alert("Invalid Credentials");
        }

    })
    .catch(error => {
        console.error(error);
        alert("Server Error");
    });
}