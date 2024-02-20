function singleChangeGateMaker(builder) {
    return shared_chanceGateMaker(builder).
        setSerializedId("Chance").
        markAsDrawerNeedsSingleQubitDensityStats().
        setDrawer(GatePainting.makeDisplayDrawer(args => {
            let {row, col} = args.positionInCircuit;
            MathPainter.paintProbabilityBox(
                args.painter,
                args.stats.controlledWireProbabilityJustAfter(row, col),
                args.rect,
                args.focusPoints);
        }));
}