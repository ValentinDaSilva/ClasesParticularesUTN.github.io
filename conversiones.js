function mostrarConversion(tipo) {
    document.getElementById('binarioADecimal').style.display = 'none';
    document.getElementById('decimalABinario').style.display = 'none';

    if (tipo === 'binarioADecimal') {
        document.getElementById('binarioADecimal').style.display = 'block';
    } else if (tipo === 'decimalABinario') {
        document.getElementById('decimalABinario').style.display = 'block';
    }
}

function convertirNumero(){
    let baseDestino = document.getElementById("baseDestino").value,
        baseOrigen = document.getElementById("baseOrigen").value;

    switch(baseDestino){
        case "2": ;break;
        case "8": ;break;
        case "10": convertirADecimal();break;
        case "16": ;break;
    }
    switch(baseOrigen){
        case "2": convertirDeDecimal();break;
        case "8": convertirDeDecimal();break;
        case "10": convertirDeDecimal();break;
        case "16": convertirDeDecimal();break;
    }
}

function pasarLetraANumero(letra){
    let numero = letra;
    switch (letra) {
        case "A": numero = "10";break;
        case "B": numero = "11";break;
        case "C": numero = "12";break;
        case "D": numero = "13";break;
        case "E": numero = "14";break;
        case "F": numero = "15";break;
    }
    return numero;
}

function pasarNumeroALetra(numero){
    let letra = numero;
    switch (numero) {
        case "10": letra = "A";break;
        case "11": letra = "B";break;
        case "12": letra = "C";break;
        case "13": letra = "D";break;
        case "14": letra = "E";break;
        case "15": letra = "F";break;
    }
    return letra;
}



function convertirADecimal() {
    function contarCaracteresAntesDelPunto(cadena) {
        const posicionPunto = cadena.indexOf('.');
        if (posicionPunto === -1) {
            return cadena.length; 
        }
        return posicionPunto;
    }

    const binario = document.getElementById('numeroInput').value,
          base = parseInt(document.getElementById('baseOrigen').value);

    let cantCifrasAntesDelPunto = contarCaracteresAntesDelPunto(binario),
        cantCifrasTotal = binario.length,
        resultado = 0;

    for(let i = 0, potenciaInicio = cantCifrasAntesDelPunto - 1; i < cantCifrasTotal; i++, potenciaInicio--){
        let caracter = pasarLetraANumero(binario[i]);
        console.log(caracter);
        if(caracter[i] != ".") resultado += parseInt(caracter)*Math.pow(base, potenciaInicio);
        else potenciaInicio++;
    }
    document.getElementById('resultadoOutput').innerText = `Decimal: ${resultado}`;
}

function convertirDeDecimal(){
    const EnDecimal = document.getElementById('numeroInput').value,
          base = parseInt(document.getElementById('baseDestino').value);

    function obtenerSubcadenaHastaPunto(cadena) {
        let indicePunto = cadena.indexOf('.');
        if (indicePunto !== -1) return cadena.substring(0, indicePunto);
        else return cadena;
    }

    let resultado = "",
        parteEntera = parseInt(obtenerSubcadenaHastaPunto(EnDecimal));
        let parteDecimal;
        if(EnDecimal.indexOf(".") != -1) parteDecimal = EnDecimal.substring(EnDecimal.indexOf(".")+1,EnDecimal.length);
        else parteDecimal = 0;
        
       function convertirParteEntera(numero,base){
            if(numero<base){
                if(base == 16) resultado += pasarNumeroALetra(numero.toString());
                else resultado += numero.toString();
            } 
            else{
                convertirParteEntera(parseInt(numero/base),base);
                if(base == 16) resultado += pasarNumeroALetra(parseInt(numero%base).toString());
                else resultado += parseInt(numero%base).toString();
                
            }
        }

    convertirParteEntera(parteEntera,base);
    if(parteDecimal !== 0){
        let contador = 0;
        parteDecimal = parseFloat("0." + parteDecimal);
        let parteEnteraMultiplicacion, parteDecimalMultiplicacion;
        resultado += ".";
        while(contador<10){
            let numero = parteDecimal * base;
            parteEnteraMultiplicacion = parseInt(numero);
            parteDecimalMultiplicacion = numero - parteEnteraMultiplicacion;
            resultado += parteEnteraMultiplicacion.toString();
            parteDecimal = parteDecimalMultiplicacion;
            contador++;
        }
    }
    document.getElementById('resultadoOutput').innerText = `Resultado: ${resultado}`;

}



