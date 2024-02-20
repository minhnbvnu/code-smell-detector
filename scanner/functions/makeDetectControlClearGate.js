function makeDetectControlClearGate(axis) {
    let builder = new GateBuilder().
        setSerializedIdAndSymbol(`${axis}DetectControlReset`).
        setTitle(`${axis} Detect-Control-Reset`).
        setBlurb(`Does a sampled ${axis}-axis measurement.\nControls operations with the result.\nResets the target to |0⟩.`).
        setDrawer(args => drawDetectClearReset(args, axis)).
        markAsControlExpecting(true, true).
        markAsReachingOtherWires().
        setActualEffectToUpdateFunc(() => {}).
        setStatTexturesMaker(withClearedControls(detectorStatTexture)).
        setSetupCleanupEffectToUpdateFunc(
            withClearedControls(ctx => {
                switchToBasis(ctx, axis, false);
                sampleMeasure(ctx);
            }),
            withClearedControls(ctx => {
                GateShaders.applyMatrixOperation(ctx, Matrix.square(1, 1, 0, 0));
            })).
        setStatPixelDataPostProcessor((pixels, circuit, row, col) => pixels[0] > 0);
    if (axis === 'Z') {
        builder.promiseEffectIsDiagonal();
    }
    return builder.gate;
}