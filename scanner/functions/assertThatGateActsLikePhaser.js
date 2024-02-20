function assertThatGateActsLikePhaser(gate, phaserFunc, forcedTime=undefined) {
    let wireCount = gate.height;
    let col = new Array(wireCount).fill(undefined);
    col[0] = gate;
    let circuit = new CircuitDefinition(wireCount, [new GateColumn(col)]);
    let matrix = Matrix.generateDiagonal(1 << wireCount, k => Complex.polar(1, phaserFunc(k)*Math.PI*2));
    let updateAction = ctx => advanceStateWithCircuit(ctx, circuit, false);
    assertThatCircuitMutationActsLikeMatrix_single(updateAction, matrix, forcedTime);
}