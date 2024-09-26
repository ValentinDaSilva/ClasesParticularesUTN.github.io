let Alumno;
document.addEventListener("DOMContentLoaded", ()=>{
    if(sessionStorage.getItem('persona') !== null){
        colocarDatos();
        actualizarDatos(Alumno.correoElectronico,Alumno.contrasenia);
    }
})

function actualizarDatos(correo,contraseña){
    let url = "https://script.google.com/macros/s/AKfycbxFHD2M8NkIEA28EkkXNQuVT_8rucvH0YcEZgz4S-yrGDxLIfQOwLV004HUUKn2JwU/exec";
    let urlFinal = url + "?correo=" + correo + "&contrasenia=" + contraseña + "&funcion=validarUsuario";
    document.querySelector(".listaHorarios").style.display = "none";
    fetch(urlFinal)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log(data);
          if(data.sesion){
              const personaJSON = JSON.stringify(data);
              sessionStorage.removeItem('persona');
              sessionStorage.setItem('persona', personaJSON);
              colocarDatos();
              document.querySelector(".listaHorarios").style.display = "block";
              document.querySelector(".loaderSencillo").style.display = "none";
          }
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      })
      console.log("Datos actualizados");
}

function colocarDatos(){
        Alumno = JSON.parse(sessionStorage.getItem('persona'));
        document.querySelector("#MensajeLogin").innerHTML = `Hola, ${Alumno.nombre}`
        document.querySelector(".cajaMensajeLogin").style.justifyContent = "end";
        document.querySelector(".cajaMensajeLogin").style.paddingRight = "10px";
        document.querySelector(".numero").innerHTML = Alumno.clasesAFavor;
        document.querySelector(".usuarioNombre").innerHTML = "Nombre Completo: " + Alumno.nombre + " " + Alumno.apellido;
        document.querySelector(".usuarioCorreo").innerHTML = "Correo: " + Alumno.correoElectronico;
        document.querySelector(".usuarioTelefono").innerHTML= "Telefono: " + Alumno.telefono;
        document.querySelector(".listaHorarios").innerHTML = '';
        Alumno.horarios.forEach(horario => {
            let li = document.createElement("li");
            li.className = "usuarioHorarios";
            li.innerHTML = horario;
            document.querySelector(".listaHorarios").appendChild(li);
        });
        if(Object.keys(Alumno.horarios).length == 0){
            let li = document.createElement("li");
            li.className = "usuarioHorarios";
            li.innerHTML = "(Sin Horarios Reservados)";
            document.querySelector(".listaHorarios").appendChild(li);
        }
}