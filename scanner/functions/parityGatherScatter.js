function parityGatherScatter(ctx, order) {
    let c = ctx.rawControls;
    let isLast = 2 << ctx.row > c.parityMask;
    let isFirst = 1 << ctx.row === (c.parityMask & ~(c.parityMask - 1));
    if (order ? isLast : isFirst) {
        ctx.applyOperation(PARITY_SHADER.withArgs(
            ...ketArgs(ctx.withRow(Util.ceilLg2(c.parityMask & c.inclusionMask))),
            WglArg.float('parityMask', c.parityMask)
        ));
    }
}