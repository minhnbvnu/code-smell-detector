function probabilityStatTexture(ketTexture, controlTexture, rangeOffset, rangeLength) {
    let trader = new WglTextureTrader(ketTexture);
    trader.dontDeallocCurrentTexture();
    let n = currentShaderCoder().vec2.arrayPowerSizeOfTexture(ketTexture);

    trader.shadeAndTrade(tex => amplitudesToProbabilities(tex, controlTexture), WglTexturePool.takeVecFloatTex(n));
    trader.shadeAndTrade(tex => GateShaders.cycleAllBitsFloat(tex, -rangeOffset));

    while (n > rangeLength) {
        n -= 1;
        trader.shadeHalveAndTrade(Shaders.sumFoldFloat);
    }

    if (currentShaderCoder().float.needRearrangingToBeInVec4Format) {
        trader.shadeQuarterAndTrade(Shaders.packFloatIntoVec4);
    }
    return trader.currentTexture;
}