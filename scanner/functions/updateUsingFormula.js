function updateUsingFormula(gate) {
    let stable = parseTimeFormula(gate.param, undefined, false) !== undefined;
    gate._stableDuration = stable ? Infinity : 0;

    if (typeof gate.param === 'string') {
        gate.width = Math.ceil((gate.param.length+1)/5);
        gate.alternate = gate._copy();
        gate.alternate.alternate = gate;
        if (gate.param.startsWith('-(') && gate.param.endsWith(')')) {
            gate.alternate.param = gate.param.substring(2, gate.param.length - 1);
        } else {
            gate.alternate.param = '-(' + gate.param + ')';
        }
    } else {
        gate.width = 1;
        gate.alternate = gate;
    }
}