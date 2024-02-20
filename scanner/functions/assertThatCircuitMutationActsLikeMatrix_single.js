function assertThatCircuitMutationActsLikeMatrix_single(updateAction, matrix, forcedTime=undefined) {
    let qubitSpan = Math.round(Math.log2(matrix.height()));
    let extraWires = Math.floor(Math.random()*5);
    let time = Math.random();
    let qubitIndex = Math.floor(Math.random() * extraWires);
    if (USE_SIMPLE_VALUES) {
        extraWires = 0;
        time = 0;
        qubitIndex = 0;
    }
    if (forcedTime !== undefined) {
        time = forcedTime;
    }
    let wireCount = qubitSpan + extraWires;
    let controls = Controls.NONE;
    for (let i = 0; i < extraWires; i++) {
        if (Math.random() < 0.5) {
            controls = controls.and(Controls.bit(i + (i < qubitIndex ? 0 : qubitSpan), Math.random() < 0.5));
        }
    }

    let ampCount = 1 << wireCount;
    let inVec = Matrix.generate(1, ampCount, () => USE_SIMPLE_VALUES ?
        (Math.random() < 0.5 ? 1 : 0) :
        new Complex(Math.random()*10 - 5, Math.random()*10 - 5));

    let tex = Shaders.vec2Data(inVec.rawBuffer()).toVec2Texture(wireCount);
    let trader = new WglTextureTrader(tex);
    let controlsTexture = CircuitShaders.controlMask(controls).toBoolTexture(wireCount);
    let ctx = new CircuitEvalContext(
        time,
        qubitIndex,
        wireCount,
        controls,
        controlsTexture,
        controls,
        trader,
        new Map());
    updateAction(ctx);

    controlsTexture.deallocByDepositingInPool();
    let outData = KetTextureUtil.tradeTextureForVec2Output(trader);
    let outVec = new Matrix(1, ampCount, outData);

    let expectedOutVec = matrix.applyToStateVectorAtQubitWithControls(inVec, qubitIndex, controls);

    assertThat(outVec).withInfo({matrix, inVec, ctx}).isApproximatelyEqualTo(expectedOutVec, 0.005);
}