function goUpload() {
    window.location.href = "upload-paper.html";
}

function logout() {
    window.location.href = "login.html";
}

window.onload = function(){

    loadStats();
    loadPapers();

}

function loadStats(){

    fetch(
    "http://127.0.0.1:5000/faculty-stats"
    )

    .then(response => response.json())

    .then(data => {

        document.getElementById(
        "totalPapers"
        ).innerHTML = data.total;

        document.getElementById(
        "encryptedPapers"
        ).innerHTML = data.encrypted;

        document.getElementById(
        "pendingPapers"
        ).innerHTML = data.pending;

    });

}

function loadPapers(){

    fetch(
    "http://127.0.0.1:5000/papers"
    )

    .then(response => response.json())

    .then(data => {

        let rows = "";

        data.papers.forEach(paper => {

            rows += `
            <tr>
                <td>${paper.subject}</td>
                <td>${paper.title}</td>
                <td>${paper.status}</td>
            </tr>
            `;

        });

        document.getElementById(
        "paperTable"
        ).innerHTML = rows;

    });

}