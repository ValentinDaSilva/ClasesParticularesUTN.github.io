const tablaHorarios = document.querySelector(".gridContainer");
const celdas = tablaHorarios.querySelectorAll("*");
var reservados = [];

celdas.forEach((celda,indice)=>{
    celda.addEventListener("click", ()=>{
        let fondo = celda.style.backgroundColor;
        if(fondo == "red"){
            reservados = eliminarElemento(reservados,indice+1);
            celda.style.backgroundColor = "white";
        }else if(verificarSiNoEstanEnLaMismaColumna(reservados,indice+1) && !celda.classList.contains("noReservable") && celda.style.backgroundColor != "transparent"){
            celda.style.backgroundColor = "red";
            reservados.push(indice+1);
        }else if(celda.classList.contains("noReservable")){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Esto no es un horario",
              });
        }else if(celda.style.backgroundColor == "transparent"){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El horario ya esta reservado",
              });
        }
        else{
            Swal.fire({
                icon: "error",
                title: "No debes seleccionar varios dias",
                text: `Si quieres varios turnos, tienes que registrarlos por separado.`,
              });
        }
        console.log(reservados);
    })
})

function verificarSiNoEstanEnLaMismaColumna(array,celda){
    if(array.length == 0) return true;
    else{
        let columnaVector = (array[0]%6 == 0)? 6 : array[0]%6;
        let columnaCelda = (celda%6 == 0)? 6 : celda%6;
        console.log(columnaVector,columnaCelda);
        if(columnaCelda == columnaVector) return true;
        else return false;
    }
}

function eliminarElemento(array, valor) {
    // Encontrar el índice del valor a eliminar
    let indice = array.indexOf(valor);
    
    // Si el valor se encuentra en el array, eliminarlo
    if (indice !== -1) {
        array.splice(indice, 1);
    }
    
    return array; // Devolver el array modificado
}

