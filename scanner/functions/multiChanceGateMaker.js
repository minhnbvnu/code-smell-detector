function multiChanceGateMaker(span, builder) {
    return shared_chanceGateMaker(builder).
        setSerializedId("Chance" + span).
        setStatTexturesMaker(ctx =>
            probabilityStatTexture(ctx.stateTrader.currentTexture, ctx.controlsTexture, ctx.row, span)).
        setStatPixelDataPostProcessor(pixels => probabilityPixelsToColumnVector(pixels, span)).
        setProcessedStatsToJsonFunc(probabilityDataToJson).
        setDrawer(GatePainting.makeDisplayDrawer(paintMultiProbabilityDisplay));
}