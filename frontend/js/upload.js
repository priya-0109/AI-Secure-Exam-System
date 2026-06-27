function uploadPaper(){

    console.log("UPLOAD BUTTON CLICKED");

    console.log(document.getElementById("paperTitle"));
    console.log(document.getElementById("copies"));

    alert("Upload Function Called");

    let formData = new FormData();

    formData.append(
        "subject",
        document.getElementById("subject").value
    );

    formData.append(
        "title",
        document.getElementById("paperTitle").value
    );

    formData.append(
        "paper",
        document.getElementById("paperFile").files[0]
    );

    formData.append(
    "exam_date",
    document.getElementById("examDate").value
    );

    formData.append(
        "exam_time",
        document.getElementById("examTime").value
    );

    formData.append(
        "copies",
        document.getElementById("copies").value
    );

    formData.append(
        "question_text",
        document.getElementById("questionText").value
    );

    fetch("http://127.0.0.1:5000/upload",{

        method:"POST",
        body:formData

    })

    .then(response => response.json())

    .then(data => {

        document.getElementById("message").innerHTML =
        data.message;

    });
}

function paraphrasePaper(){

let text =
document.getElementById("questionText").value;

fetch(
"http://127.0.0.1:5000/paraphrase",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
text:text
})
})

.then(response => response.json())

.then(data => {

document.getElementById("message").innerHTML =

`
<h3>AI Result</h3>

<b>Original:</b><br>
${data.original}

<br><br>

<b>Paraphrased:</b><br>
${data.paraphrased}
`;

})

.catch(error => {

console.log(error);
alert("Paraphrase API Error");

});

}

function encryptPaper(){

    alert(
        "Paper upload Successfully"
    );

}