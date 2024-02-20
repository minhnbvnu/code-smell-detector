function assertThatCircuitUpdateActsLikePermutation(wireCount, updateAction, permutation, permuteInfo=undefined) {
    let time = Math.random();

    let ampCount = 1 << wireCount;
    let inVec = Matrix.generate(1, ampCount, r => new Complex(r + Math.random(), Math.random()*1000));
    let tex = Shaders.vec2Data(inVec.rawBuffer()).toVec2Texture(wireCount);
    let trader = new WglTextureTrader(tex);
    let controlsTexture = CircuitShaders.controlMask(Controls.NONE).toBoolTexture(wireCount);
    let ctx = new CircuitEvalContext(
        time,
        0,
        wireCount,
        Controls.NONE,
        controlsTexture,
        Controls.NONE,
        trader,
        new Map());
    updateAction(ctx);

    controlsTexture.deallocByDepositingInPool();
    let outData = KetTextureUtil.tradeTextureForVec2Output(trader);
    let outVec = new Matrix(1, ampCount, outData);

    for (let i = 0; i < ampCount; i++) {
        let j = permutation(i);
        let inVal = inVec.cell(0, i);
        let outVal = outVec.cell(0, j);
        if (!outVal.isApproximatelyEqualTo(inVal, 0.001)) {
            let actualIn = Math.floor(outVec.cell(0, j).real);
            let actualOut = Seq.range(ampCount).filter(k => Math.floor(outVec.cell(0, k).real) === i).first('[NONE]');
            assertThat(outVal).
                withInfo({i, j, actualIn, actualOut, permuteInfo}).
                isApproximatelyEqualTo(inVal, 0.01);
        }
    }

    // Increment assertion count.
    assertTrue(true);
}