function verifyOTP(){

let otp =
document.getElementById("otpInput").value;

fetch(
"http://127.0.0.1:5000/verify-otp",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
otp:otp
})
}
)

.then(response => response.json())

.then(data => {

console.log("VERIFY RESPONSE =", data);

if(data.success){

alert("OTP VERIFIED");

fetch(
`http://127.0.0.1:5000/paper-details/${otp}`
)

.then(response => response.json())

.then(paper => {

console.log(paper);

document.getElementById("paperInfo").innerHTML = `
<h2>Access Granted ✅</h2>
<p><b>Title:</b> ${paper.title}</p>
<p><b>Subject:</b> ${paper.subject}</p>
<p><b>Status:</b> ${paper.status}</p>
`;

})

.catch(error => {

alert("PAPER DETAILS ERROR");

console.error(error);

});

}

else{

alert("Invalid OTP");

}

})

.catch(error => {

alert("VERIFY OTP ERROR");

console.log(error);

});

}