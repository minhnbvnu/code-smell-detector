function textureWithTotalWeightMatchingGivenControls(ketTexture, controlMaskTex, forStats=false) {
    let powerSize = currentShaderCoder().vec2.arrayPowerSizeOfTexture(ketTexture);

    // Convert the matching amplitudes to probabilities (and the non-matching ones to 0).
    let trader = new WglTextureTrader(ketTexture);
    trader.dontDeallocCurrentTexture();
    trader.shadeAndTrade(
        tex => amplitudesToProbabilities(tex, controlMaskTex),
        WglTexturePool.takeVecFloatTex(powerSize));

    // Sum the probabilities.
    let n = currentShaderCoder().vec2.arrayPowerSizeOfTexture(ketTexture);
    while (n > 0) {
        n -= 1;
        trader.shadeHalveAndTrade(Shaders.sumFoldFloat);
    }

    trader.shadeAndTrade(Shaders.packFloatIntoVec4, WglTexturePool.takeVec4Tex(0));
    return trader.currentTexture;
}