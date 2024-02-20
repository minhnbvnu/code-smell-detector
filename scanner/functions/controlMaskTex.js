function controlMaskTex(ctx, controls) {
    let powerSize = currentShaderCoder().vec2.arrayPowerSizeOfTexture(ctx.stateTrader.currentTexture);
    return CircuitShaders.controlMask(controls).toBoolTexture(powerSize);
}