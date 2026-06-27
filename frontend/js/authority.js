window.onload = function(){

    loadPapers();
    loadStats();

    let otp = localStorage.getItem("currentOTP");

    if(otp){

        document.getElementById("otpDisplay").innerHTML =
        "Generated OTP : " + otp;
    }
};

function loadPapers(){

fetch("http://127.0.0.1:5000/papers")

.then(response => response.json())

.then(data => {

let table =
document.getElementById("paperTable");

/* Purani rows clear karo */
table.innerHTML = `
<tr>
    <th>ID</th>
    <th>Title</th>
    <th>Subject</th>
    <th>Status</th>
    <th>Action</th>
    <th>Download</th>
</tr>
`;

data.papers.forEach(paper => {

let actionButtons = "";

if(paper.status === "Pending"){

    actionButtons = `
    <button onclick="approvePaper(${paper.id})">
    Approve
    </button>

    <button onclick="rejectPaper(${paper.id})">
    Reject
    </button>
    `;
}

else if(paper.status === "Approved"){

    actionButtons = `
    <button onclick="generateKey(${paper.id})">
    Generate OTP
    </button>
    `;
}

else{

    actionButtons = `Rejected`;

}

table.innerHTML += `
<tr>
<td>${paper.id}</td>
<td>${paper.title}</td>
<td>${paper.subject}</td>
<td>${paper.status}</td>

<td>
${actionButtons}
</td>

<td>
<a href="http://127.0.0.1:5000/download/${paper.id}">
Download
</a>
</td>

</tr>
`;

});

});

}

function openViewer(){

window.location.href =
"secure-viewer.html";

}

function approvePaper(id){

    fetch(
    `http://127.0.0.1:5000/approve/${id}`
    )

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        loadPapers();
        loadStats();

    })

    .catch(error => {

        console.log(error);

    });

}



function loadStats(){

fetch(
"http://127.0.0.1:5000/authority-stats"
)

.then(response => response.json())

.then(data => {

document.getElementById(
"totalPapers"
).innerHTML = data.total;

document.getElementById(
"approvedPapers"
).innerHTML = data.approved;

document.getElementById(
"pendingPapers"
).innerHTML = data.pending;

document.getElementById(
"rejectedPapers"
).innerHTML = data.rejected;

});

}

function generateKey(id){

fetch(
`http://127.0.0.1:5000/generate-otp/${id}`
)

.then(response => response.json())

.then(data => {

document.getElementById(
"otpDisplay"
).innerHTML =
"Generated OTP : " + data.otp;

localStorage.setItem(
"currentOTP",
data.otp
);

alert("OTP Generated Successfully");

});

}