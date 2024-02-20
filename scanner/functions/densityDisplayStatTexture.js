function densityDisplayStatTexture(inp, qubitCount, controls, rangeOffset, rangeLength) {
    let trader = new WglTextureTrader(inp);
    trader.dontDeallocCurrentTexture();

    // Put into normal form by throwing away areas not satisfying the controls and cycling the offset away.
    let startingQubits = currentShaderCoder().vec2.arrayPowerSizeOfTexture(inp);
    let lostQubits = Util.numberOfSetBits(controls.inclusionMask);
    let lostHeadQubits = Util.numberOfSetBits(controls.inclusionMask & ((1<<rangeOffset)-1));
    trader.shadeAndTrade(
            ket => CircuitShaders.controlSelect(controls, ket),
        WglTexturePool.takeVec2Tex(startingQubits - lostQubits));
    trader.shadeAndTrade(ket => GateShaders.cycleAllBits(ket, lostHeadQubits-rangeOffset));

    // Expand amplitudes into couplings.
    let n = qubitCount - lostQubits + rangeLength;
    trader.shadeAndTrade(e => amplitudesToCouplings(e, rangeLength), WglTexturePool.takeVec2Tex(n));

    // Sum up the density matrices from all combinations of the unincluded qubits' values.
    while (n > 2*rangeLength) {
        n--;
        trader.shadeHalveAndTrade(Shaders.sumFoldVec2);
    }

    if (currentShaderCoder().vec2.needRearrangingToBeInVec4Format) {
        trader.shadeHalveAndTrade(Shaders.packVec2IntoVec4);
    }
    return trader.currentTexture;
}