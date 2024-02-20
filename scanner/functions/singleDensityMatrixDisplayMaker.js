function singleDensityMatrixDisplayMaker(builder) {
    return densityMatrixDisplayMaker_shared(builder).
        setSerializedId("Density").
        markAsDrawerNeedsSingleQubitDensityStats().
        setDrawer(GatePainting.makeDisplayDrawer(args => {
            let {col, row} = args.positionInCircuit;
            let ρ = args.stats.qubitDensityMatrix(col, row).transpose();
            MathPainter.paintDensityMatrix(args.painter, ρ, args.rect, args.focusPoints);
        }));
}