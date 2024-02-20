function estaEntre(min, max, numero, inclusivo = false) {
    if (inclusivo) {
        return numero >= min && numero <= max;
    } else {
        return numero > min && numero < max;
    }

    //RESOLUÇÃO COM OPERADORES TERNÁRIOS
    //return inclusivo ? numero >= min && numero <= max : numero > min && numero < max;
}