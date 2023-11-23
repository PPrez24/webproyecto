

const searchForm = document.getElementById("registroForm");
async function login(){
    event.preventDefault();
    let mail = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = {mail, password};
    try{
        let resp = await fetch('/api/user', {
            method : 'POST',
            headers: {
                "content-type":"application/json"
            },
            body : JSON.stringify(user)
        });
        if (!resp.ok) {
            throw new Error("HTTP status " + resp.status);
        }
        resp = await resp.json();
        console.log(resp);
        localStorage.setItem("token", resp.token);
        location.href = './mes.html';
    }catch(e){
        console.log(e);
        alert("Usuario o contraseña incorrectos");
    }
   
}
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    login();
});
