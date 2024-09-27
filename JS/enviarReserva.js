document.querySelector(".botonReservar").addEventListener("click", async () => {
    if (Alumno == null || !Alumno.sesion) {
        Swal.fire({
            title: "Accion Erronea",
            icon: "info",
            html: `Debes iniciar sesion para reservar un horario`,
            showConfirmButton: true
          });
    } else if (reservados == undefined || reservados.length == 0) {
        Swal.fire({
            title: "Accion Erronea",
            icon: "info",
            html: `Debes clickear las celdas que quieres reservar`,
            showConfirmButton: true
          });
    } else {
        await enviarCeldasReservadas(reservados,numeroHoja);
        await asignarHorario(reservados,numeroHoja);
    }
});

async function enviarCeldasReservadas(horariosSeleccionados, numeroDeHoja) {
    if (numeroDeHoja == undefined) numeroDeHoja = 0;
    let datos = {
        funcion: "reservarHorario",
        celdas: horariosSeleccionados,
        numeroHoja: numeroDeHoja,
    };
    let url = "https://script.google.com/macros/s/AKfycbwr3_csqYI3XPL5CMUsZiOVGYolPnvMiDg8uj-A_bK7r69Lj5-ZPEiSDMoTaYg9/exec";

    document.querySelector(".gridContainer").style.display = "none";
    let loader = crearLoader();
    loader.className = "loader";
    document.querySelector(".tablaHorarios").appendChild(loader);

    await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }).then(console.log("datos enviados"))
      .catch(function (error) {
          console.error('Error al enviar datos:', error);
      }).finally(() => {
          window.location.reload();
      });
}

async function asignarHorario(celdas, numeroDeHoja) {
    if (numeroDeHoja == undefined) numeroDeHoja = 0;
    let datos = {
        persona: Alumno,
        funcion: "asignarHorario",
        celdas: celdas,
        numeroHoja: numeroDeHoja,
    };
    let url = "https://script.google.com/macros/s/AKfycbzKa5cpRcjymslgmdPzfUssKzaUMHe8RrpBpGJ4kKQY6K_FgB_NNmRbRs-Hy5Wbovg/exec";
    console.log(datos);
    await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }).then(console.log("datos enviados"))
      .catch(function (error) {
          console.error('Error al enviar datos:', error);
      });
}
