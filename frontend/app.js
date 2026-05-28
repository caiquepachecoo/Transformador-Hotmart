async function converter(){

const arquivo =
document.getElementById("pdf").files[0];

if(!arquivo){
alert("Escolha um PDF");
return;
}

const formData = new FormData();

formData.append("pdf", arquivo);

const req = await fetch(
"https://transformador-hotmart.onrender.com/upload",
{
method:"POST",
body:formData
}
);

const data = await req.json();

document.getElementById(
"resultado"
).innerHTML = `
<h2>URL</h2>
<input value="${data.url}" readonly>

<h2>Iframe</h2>

<textarea readonly>
${data.iframe}
</textarea>
`;

}
