function _sumDownVec4(trader, outCount) {
    // When the number of kept qubits isn't a power of 2, we have some extra junk results interleaved to ignore.
    let outputSizePower = Util.ceilLg2(outCount);
    let curSizePower = currentShaderCoder().vec4.arrayPowerSizeOfTexture(trader.currentTexture);

    while (curSizePower > outputSizePower) {
        trader.shadeHalveAndTrade(Shaders.sumFoldVec4);
        curSizePower -= 1;
    }
}