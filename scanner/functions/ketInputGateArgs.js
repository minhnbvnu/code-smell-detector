function ketInputGateArgs(ctx, letter) {
    let offset = 0;
    let length = -1;
    let defaultVal = ctx.customContextFromGates.get(`Input Default ${letter}`) || 0;
    let inputCtx = ctx.customContextFromGates.get(`Input Range ${letter}`);
    if (inputCtx !== undefined) {
        offset = inputCtx.offset;
        length = inputCtx.length;
    }

    return [
        WglArg.float(`_gen_input_default_${letter}`, defaultVal),
        WglArg.float(`_gen_input_offset_${letter}`, 1<<offset),
        WglArg.float(`_gen_input_span_${letter}`, length === -1 ? 0 : 1<<length),
    ];
}