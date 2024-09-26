let numeroHoja = 0;
document.querySelector(".cambioDeSemana").addEventListener("click", (e) => {
    if (e.target.classList.contains("semana1")) {
        numeroHoja = 1;
        document.querySelector(".cambioDeSemana").innerHTML = "Semana Anterior";
        cambiarFondoCeldas(Semana2); // Asegúrate de que Semana2 está definido correctamente
        document.querySelector(".cambioDeSemana").classList.remove("semana1");
        document.querySelector(".cambioDeSemana").classList.add("semana2");
    } else{
        document.querySelector(".cambioDeSemana").innerHTML = "Semana Siguiente";
        cambiarFondoCeldas(Semana1);
        document.querySelector(".cambioDeSemana").classList.add("semana1");
        document.querySelector(".cambioDeSemana").classList.remove("semana2");
        numeroHoja = 0;
    }
});
