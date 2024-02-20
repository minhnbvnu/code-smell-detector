function toJson_GateColumn(v, context=new CustomGateSet()) {
    return v.gates.map(e => e === undefined ? 1 : toJson_Gate(e, context));
}