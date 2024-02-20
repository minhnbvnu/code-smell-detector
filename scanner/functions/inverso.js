function inverso(valor) {
    const tipo = typeof valor;

    if (tipo === "boolean") {
        return !valor;
    } else if (tipo === "number") {
        return -valor;
    } else {
        return `Booleano ou Número esperados, mas o parâmetro é do tipo ${tipo}`;
    }
}