function toJson_CustomGateSet(v) {
    let result = [];
    for (let i = 0; i < v.gates.length; i++) {
        result.push(toJson_Gate(v.gates[i], new CustomGateSet(...v.gates.slice(0, i))));
    }
    return result;
}