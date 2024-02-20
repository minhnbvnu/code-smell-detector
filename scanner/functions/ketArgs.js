function ketArgs(ctx, span=undefined, input_letters=[]) {
    let result = [
        ctx.stateTrader.currentTexture,
        ctx.controlsTexture,
        WglArg.float("_ketgen_step", 1 << ctx.row)
    ];
    if (span !== undefined) {
        result.push(WglArg.float('span', 1 << span));
    }
    for (let letter of input_letters) {
        result.push(...ketInputGateArgs(ctx, letter));
    }
    return result;
}