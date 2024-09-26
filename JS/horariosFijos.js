function cambiarFondoDeHijos(indices) {
    const tablaHorarios = document.querySelector(".gridContainer");
    const celdas = tablaHorarios.querySelectorAll("*");

    for(let i = 0; i < celdas.length; i++){
        if(indices.includes(i + 1)){
            celdas[i].style.backgroundColor != "transparent";
            // celdas[i].style.border = "2px solid black";
        }
    }
}


let horariosFijos = [];
cambiarFondoDeHijos(horariosFijos);

