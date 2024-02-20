function makeDetector(axis) {
    let state = new Map([
        ['X', '|0⟩-|1⟩'],
        ['Y', '|0⟩-i|1⟩'],
        ['Z', '|1⟩'],
    ]).get(axis);
    let builder = new GateBuilder().
        setSerializedIdAndSymbol(`${axis}Detector`).
        setTitle(`${axis} Axis Detector`).
        setBlurb(
            `Sampled ${axis}-axis measurement.\n` +
            `Shows *click* when the target qubit is ${state} and controls are satisfied.`).
        setDrawer(args => drawDetector(args, axis)).
        markAsReachingOtherWires().
        setSetupCleanupEffectToUpdateFunc(
            ctx => switchToBasis(ctx, axis, false),
            ctx => switchToBasis(ctx, axis, true)).
        setActualEffectToUpdateFunc(sampleMeasure).
        setStatTexturesMaker(detectorStatTexture).
        setStatPixelDataPostProcessor((pixels, circuit, row, col) => pixels[0] > 0);
    if (axis === 'Z') {
        builder.promiseEffectIsDiagonal();
    }
    return builder.gate;
}