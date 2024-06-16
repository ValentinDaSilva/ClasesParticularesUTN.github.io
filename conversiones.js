function mostrarConversion(tipo) {
    document.getElementById('binarioADecimal').style.display = 'none';
    document.getElementById('decimalABinario').style.display = 'none';

    if (tipo === 'binarioADecimal') {
        document.getElementById('binarioADecimal').style.display = 'block';
    } else if (tipo === 'decimalABinario') {
        document.getElementById('decimalABinario').style.display = 'block';
    }
}

function validaciones(entrada,base){
    let error = false;
    let binario = ["0","1","."],
        octal = ["0","1","2","3","4","5","6","7","."],
        decimal = ["0","1","2","3","4","5","6","7","8","9","-","."],
        hexadecimal = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","."];
    switch(base){
        case "2": 
            for(let i = 0; i < entrada.length; i++){
                if(!binario.includes(entrada[i])) {
                    alert("No puedes colocar el simbolo "+entrada[i]+"en numeros binarios");
                    error = true;
                }
            }
            ;break;
            case "8": 
            for(let i = 0; i < entrada.length; i++){
                if(!octal.includes(entrada[i])) {
                    alert("No puedes colocar el simbolo "+entrada[i]+"en numeros octales");
                    error = true;
                }
            }
            ;break;
            case "10": 
            for(let i = 0; i < entrada.length; i++){
                if(!decimal.includes(entrada[i])) {
                    alert("No puedes colocar el simbolo "+entrada[i]+"en numeros decimales");
                    error = true;
                }
            }
            ;break;
            case "16": 
            for(let i = 0; i < entrada.length; i++){
                if(!hexadecimal.includes(entrada[i])) {
                    alert("No puedes colocar el simbolo "+entrada[i]+"en numeros hexadecimales");
                    error = true;
                }
            }
        ;break;
    }
    return error;
}

function convertirNumero(){
    let baseDestino = document.getElementById("baseDestino").value,
        baseOrigen = document.getElementById("baseOrigen").value,
        numero = document.getElementById('numeroInput').value;
    if(numero.includes("-") && baseDestino != "2") alert("Solo puedes convertir numeros negativos a binario");
    else if(!validaciones(baseOrigen)){
        if(baseDestino == "10") convertirADecimal();
        else if(baseOrigen == "10") convertirDeDecimal();
        else convertirAOtraBase();
    }
}

function convertirAOtraBase(){
    let baseDestino = document.getElementById("baseDestino").value,
    baseOrigen = document.getElementById("baseOrigen").value;
    let decimal = convertirADecimal(baseOrigen);
    convertirDeDecimal(decimal, baseDestino);
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



function convertirADecimal(base) {
    let indirecta = !(base === undefined);
    function contarCaracteresAntesDelPunto(cadena) {
        const posicionPunto = cadena.indexOf('.');
        if (posicionPunto === -1) {
            return cadena.length; 
        }
        return posicionPunto;
    }

    const numero = document.getElementById('numeroInput').value;
    if(!indirecta) base = parseInt(document.getElementById('baseOrigen').value);

    let cantCifrasAntesDelPunto = contarCaracteresAntesDelPunto(numero),
        cantCifrasTotal = numero.length,
        resultado = 0;

    for(let i = 0, potenciaInicio = cantCifrasAntesDelPunto - 1; i < cantCifrasTotal; i++, potenciaInicio--){
        let caracter = pasarLetraANumero(numero[i]);
        if(caracter != ".") resultado += parseInt(caracter)*Math.pow(base, potenciaInicio);
        else potenciaInicio++;
    }
    if(!indirecta) document.getElementById('resultadoOutput').innerText = `Decimal: ${resultado}`;
    else return resultado.toString();
}

function convertirDeDecimal(numero,base){
    let indirecta = !(base === undefined);
    
    if(numero === undefined) numero = document.getElementById('numeroInput').value;
    if(!indirecta) base = parseInt(document.getElementById('baseDestino').value);

    function obtenerSubcadenaHastaPunto(cadena) {
        let indicePunto = cadena.indexOf('.');
        if (indicePunto !== -1) return cadena.substring(0, indicePunto);
        else return cadena;
    }

    let negativo;
    if(numero[0] == "-" && !indirecta){
        negativo = true;
        numero =  numero.substr(1,numero.length-1);
        
    }

    let resultado = "",
        parteEntera = parseInt(obtenerSubcadenaHastaPunto(numero));
        let parteDecimal;
        if(numero.indexOf(".") != -1) parteDecimal = numero.substring(numero.indexOf(".")+1,numero.length);
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
    resultado = eliminarCerosAlFinal(resultado);
    if(negativo){
        resultado = CA2(resultado);
        resultado = concat("1 ",resultado);
    }
    document.getElementById('resultadoOutput').innerText = `Resultado: ${resultado}`;
}

function eliminarCerosAlFinal(cadena){
        let i = cadena.length - 1;
        if(cadena.includes(".")){
            while (i >= 0 && cadena[i] == '0') {
                i--; 
            }
            
            if (i >= 0 && cadena[i] == '.') {
                i--;
            }
            return cadena.substr(0, i + 1);
        }
        else return cadena;
}

function XOR(a,b){
    return (a == 0 && b == 1) || (a == 1 && b == 0);
}

function sumarDosDigitos(n1,n2,acarreo){

    function convertirAInt(numero){
        let resultado;
        (numero)? resultado = 1: resultado = 0;
        return resultado;
    }

    acarreo = parseInt(acarreo);
    n1 = parseInt(n1);
    n2 = parseInt(n2);
    let r1 = convertirAInt(XOR(acarreo,n2));
    let acarreo1 = convertirAInt(acarreo && n2);
    let acarreo2 = convertirAInt(r1 && n1);
    return {resultado:convertirAInt(XOR(r1,n1)),acarreo: convertirAInt(acarreo1 || acarreo2)};
}


function concat(s1, s2) {
    return s1 + s2;
}

function sumarDosNumeros(n1,n2){
    let imprimirResultado = (n1 === undefined || n2 === undefined);
    if(imprimirResultado) n1 = document.getElementById("numeroInput1").value;
    if(imprimirResultado) n2 = document.getElementById("numeroInput2").value;
    let acarreoAnterior;
    let resultado = "";

    let parteEnteraN1 = n1,
        parteEnteraN2 = n2;
    if(n1.includes(".") && n2.includes(".")){
        parteEnteraN1 = n1.substr(0,indiceOf(".")-1);
        parteEnteraN2 = n2.substr(0,indiceOf(".")-1);
        console.log("Numero con coma");
        let parteFraccionariaN1 = n1.substr(n1.indexOf(".")+1,n1.length-1);
        let parteFraccionariaN2 = n2.substr(n2.indexOf(".")+1,n2.length-1);
        sumaEnteros(parteFraccionariaN1,parteFraccionariaN2);
        resultado = concat(".",resultado);
    }

    function sumaEnteros(n1,n2){
        console.log("N1: ",n1);
        console.log("N2: ",n2);
        let n1UltimoIndice = n1.length - 1;
        let n2UltimoIndice = n2.length - 1;
        console.log("n1 longitud: ",n1UltimoIndice+1);
        console.log("n2 longitud: ",n2UltimoIndice+1);
        if(acarreoAnterior === undefined ) acarreoAnterior = 0;
        while(n1UltimoIndice >= 0 && n2UltimoIndice >= 0){
            let aux;
            aux = sumarDosDigitos(n1[n1UltimoIndice],n2[n2UltimoIndice],acarreoAnterior);
            
            acarreoAnterior = aux.acarreo;
            resultado = concat(aux.resultado,resultado);
            n1UltimoIndice--;n2UltimoIndice--;
            
        }
        while(n1UltimoIndice >= 0){
            let aux;
            if(acarreoAnterior){
                aux = sumarDosDigitos(n1[n1UltimoIndice],0,acarreoAnterior);
                acarreoAnterior = aux.acarreo;
                resultado = concat(aux.resultado,resultado);
            }else{
                resultado = concat(n1[n1UltimoIndice],resultado);
            }
            n1UltimoIndice--;
        }
        while(n2UltimoIndice >= 0){
            let aux;
            if(acarreoAnterior){
                aux = sumarDosDigitos(0,n2[n2UltimoIndice],acarreoAnterior);
                acarreoAnterior = aux.acarreo;
                resultado = concat(aux.resultado,resultado);
            }else{
                resultado = concat(n2[n2UltimoIndice],resultado);
            }
            n2UltimoIndice--;
        }
    }
    sumaEnteros(parteEnteraN1,parteEnteraN2);
    if(acarreoAnterior == "1") resultado = concat(acarreoAnterior,resultado);
    
    document.getElementById('resultadoOutput2').innerText = `Resultado: ${resultado}`;
    return resultado;
}

function CA2(numero){
    function invertirCifras(numero){
        let aux = "";
        for(let i = 0; i < numero.length; i++){
            aux += (1 - parseInt(numero[i])).toString();    
        }
        return aux;
    }
    let indice = numero.indexOf(".");
    let aux = "";
    let longitud;
    if(indice!=-1){
        for(let i = 0; i < numero.length; i++){
            if(i != indice) aux+=numero[i];
        }
        aux = invertirCifras(aux);
        aux = sumarDosNumeros(aux,"1");
        numero = aux.substring(0,indice)+"."+aux.substring(indice,aux.length-1);
    }else{
        numero = invertirCifras(numero);
        longitud = numero.length;
        numero = sumarDosNumeros(numero,"1");
        let longitud2 = numero.length;

        for(let i = 0; i < (longitud - longitud2); i++){
            numero = concat("0",numero);
        }
    }
    return numero;    
}

function restarDosNumeros(n1,n2){
    if(n1 == undefined) n1 = document.getElementById("numeroResta1").value;
    if(n2 == undefined) n2 = document.getElementById("numeroResta2").value;
    let n1Cifras = n1.length,
        n2Cifras = n2.length;
    for(let i = n1Cifras; i < n2Cifras; i++){
        n1 = concat("0",n1);
    }
    for(let i = n2Cifras; i < n1Cifras; i++){
        n2 = concat("0",n2);
    }
    let negativo = CA2(n2);
    console.log(n1,negativo);
    
    function sumarDosNumerosParaResta(n1,n2){
        let imprimirResultado = (n1 === undefined || n2 === undefined);
        if(imprimirResultado) n1 = document.getElementById("numeroInput1").value;
        if(imprimirResultado) n2 = document.getElementById("numeroInput2").value;
        let acarreoAnterior;
        let resultado = "";
    
        let parteEnteraN1 = n1,
            parteEnteraN2 = n2;
        if(n1.includes(".") && n2.includes(".")){
            parteEnteraN1 = n1.substr(0,indiceOf(".")-1);
            parteEnteraN2 = n2.substr(0,indiceOf(".")-1);
            console.log("Numero con coma");
            let parteFraccionariaN1 = n1.substr(n1.indexOf(".")+1,n1.length-1);
            let parteFraccionariaN2 = n2.substr(n2.indexOf(".")+1,n2.length-1);
            sumaEnteros(parteFraccionariaN1,parteFraccionariaN2);
            resultado = concat(".",resultado);
        }
    
        function sumaEnterosParaResta(n1,n2){
            console.log("N1: ",n1);
            console.log("N2: ",n2);
            let n1UltimoIndice = n1.length - 1;
            let n2UltimoIndice = n2.length - 1;
            console.log("n1 longitud: ",n1UltimoIndice+1);
            console.log("n2 longitud: ",n2UltimoIndice+1);
            if(acarreoAnterior === undefined ) acarreoAnterior = 0;
            while(n1UltimoIndice >= 0 && n2UltimoIndice >= 0){
                let aux;
                aux = sumarDosDigitos(n1[n1UltimoIndice],n2[n2UltimoIndice],acarreoAnterior);
                
                acarreoAnterior = aux.acarreo;
                resultado = concat(aux.resultado,resultado);
                n1UltimoIndice--;n2UltimoIndice--;
                
            }
            while(n1UltimoIndice >= 0){
                let aux;
                if(acarreoAnterior){
                    aux = sumarDosDigitos(n1[n1UltimoIndice],0,acarreoAnterior);
                    acarreoAnterior = aux.acarreo;
                    resultado = concat(aux.resultado,resultado);
                }else{
                    resultado = concat(n1[n1UltimoIndice],resultado);
                }
                n1UltimoIndice--;
            }
            while(n2UltimoIndice >= 0){
                let aux;
                if(acarreoAnterior){
                    aux = sumarDosDigitos(0,n2[n2UltimoIndice],acarreoAnterior);
                    acarreoAnterior = aux.acarreo;
                    resultado = concat(aux.resultado,resultado);
                }else{
                    resultado = concat(n2[n2UltimoIndice],resultado);
                }
                n2UltimoIndice--;
            }
        }
        sumaEnterosParaResta(parteEnteraN1,parteEnteraN2);
        
        
        document.getElementById('resultadoOutput2').innerText = `Resultado: ${resultado}`;
        return {resultado,acarreoFinal:acarreoAnterior};
    }
    let suma = sumarDosNumerosParaResta(n1,negativo);

    if(suma.acarreoFinal){
        document.getElementById("resultadoOutput3").innerHTML = "Resultado 1 "+suma.resultado;
        document.getElementById("resultadoOutput4").innerHTML = "(Resultado positivo)";
    }
    else {
        document.getElementById("resultadoOutput3").innerHTML = "Resultado 0 "+suma.resultado;
        document.getElementById("resultadoOutput4").innerHTML = "(Resultado negativo)";
    }
}


