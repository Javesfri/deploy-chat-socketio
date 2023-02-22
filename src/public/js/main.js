const socket = io();

const botonChat = document.getElementById("botonChat");
const parrafosMensajes = document.getElementById("parrafosMensajes");

let user;
const val = document.getElementById("chatBox");


Swal.fire({
    title: "Identificacion de usuario",
    text: "Por favor ingrese su nombre de usuario",
    input: "text",
    inputValidator: (valor) =>{
        return !valor && "Ingrese un valor valido"
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
}) 


botonChat.addEventListener("click", () => {
  if(val.value.trim().length >0){
    socket.emit("mensaje",{usuario:user,mensaje:val.value})
    val.value=""
  }
});

socket.on("mensajes",arrayMensajes =>{
    parrafosMensajes.innerHTML ="" //Limpio los parrafos
    arrayMensajes.forEach(mensaje =>{
        parrafosMensajes.innerHTML +=`<p><strong>${mensaje.usuario}</strong> dice: ${mensaje.mensaje} </p>`
    })
})

