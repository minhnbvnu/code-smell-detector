function _superpositionTexToUnsummedQubitDensitiesTex(trader, keptBitMask) {
    if (keptBitMask === 0) {
        throw new DetailedError("keptBitMask === 0", {trader, keptBitMask});
    }
    let startingQubitCount = currentShaderCoder().vec2.arrayPowerSizeOfTexture(trader.currentTexture);
    let remainingQubitCount = Util.numberOfSetBits(keptBitMask);
    trader.shadeAndTrade(
        tex => CircuitShaders.qubitDensities(tex, keptBitMask),
        WglTexturePool.takeVec4Tex(startingQubitCount - 1 + Util.ceilLg2(remainingQubitCount)));
}