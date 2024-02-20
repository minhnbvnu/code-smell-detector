function amplitudeDisplayStatTextures(stateKet, controls, controlsTexture, rangeOffset, rangeLength) {
    let incoherentKet = probabilityStatTexture(stateKet, controlsTexture, rangeOffset, rangeLength);

    let trader = new WglTextureTrader(stateKet);
    trader.dontDeallocCurrentTexture();

    // Put into normal form by throwing away areas not satisfying the controls and cycling the offset away.
    let startingQubits = currentShaderCoder().vec2.arrayPowerSizeOfTexture(stateKet);
    let lostQubits = Util.numberOfSetBits(controls.inclusionMask);
    let lostHeadQubits = Util.numberOfSetBits(controls.inclusionMask & ((1<<rangeOffset)-1));
    let involvedQubits = startingQubits - lostQubits;
    let broadcastQubits = involvedQubits - rangeLength;

    // Get relevant case vectors.
    trader.shadeAndTrade(
        tex => CircuitShaders.controlSelect(controls, tex),
        WglTexturePool.takeVec2Tex(involvedQubits));
    trader.shadeAndTrade(tex => GateShaders.cycleAllBits(tex, lostHeadQubits-rangeOffset));
    let ketJustAfterCycle = trader.dontDeallocCurrentTexture();

    // Compute magnitude of each case's vector.
    trader.shadeAndTrade(AMPS_TO_SQUARED_MAGS_SHADER, WglTexturePool.takeVecFloatTex(involvedQubits));
    for (let k = 0; k < rangeLength; k++) {
        trader.shadeHalveAndTrade(Shaders.sumFoldFloatAdjacents);
    }

    // Find the index of the case with the largest vector.
    trader.shadeAndTrade(MAGS_TO_INDEXED_MAGS_SHADER, WglTexturePool.takeVec2Tex(broadcastQubits));
    for (let k = 0; k < broadcastQubits; k++) {
        trader.shadeHalveAndTrade(FOLD_MAX_INDEXED_MAG_SHADER);
    }

    // Lookup the components of the largest vector.
    trader.shadeAndTrade(
        indexed_mag => LOOKUP_KET_AT_INDEXED_MAG_SHADER(ketJustAfterCycle, indexed_mag),
        WglTexturePool.takeVec2Tex(rangeLength));
    let rawKet = trader.dontDeallocCurrentTexture();

    // Compute the dot product of the largest vector against every other vector.
    trader.shadeAndTrade(
        small_input => POINTWISE_CMUL_CONJ_SHADER(small_input, ketJustAfterCycle),
        WglTexturePool.takeVec2Tex(involvedQubits));
    ketJustAfterCycle.deallocByDepositingInPool("ketJustAfterCycle in makeAmplitudeSpanPipeline");
    for (let k = 0; k < rangeLength; k++) {
        trader.shadeHalveAndTrade(Shaders.sumFoldVec2Adjacents);
    }

    // Sum up the magnitudes of the dot products to get a quality metric for how well the largest vector worked.
    trader.shadeAndTrade(AMPS_TO_SQUARED_MAGS_SHADER, WglTexturePool.takeVecFloatTex(broadcastQubits));
    for (let k = 0; k < broadcastQubits; k++) {
        trader.shadeHalveAndTrade(Shaders.sumFoldFloat);
    }

    if (currentShaderCoder().float.needRearrangingToBeInVec4Format) {
        trader.shadeHalveAndTrade(Shaders.packFloatIntoVec4);
    }
    let denormalizedQuality = trader.currentTexture;

    trader.currentTexture = rawKet;
    if (currentShaderCoder().vec2.needRearrangingToBeInVec4Format) {
        trader.shadeHalveAndTrade(Shaders.packVec2IntoVec4);
    }
    let ket = trader.currentTexture;

    return [ket, denormalizedQuality, incoherentKet];
}