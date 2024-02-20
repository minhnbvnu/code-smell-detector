function largeDensityMatrixDisplayMaker(span, builder) {
    return densityMatrixDisplayMaker_shared(builder).
        setSerializedId("Density" + span).
        setWidth(span).
        setDrawer(DENSITY_MATRIX_DRAWER_FROM_CUSTOM_STATS).
        setProcessedStatsToJsonFunc(data => {
            return {density_matrix: data.toReadableJson()};
        }).
        setStatTexturesMaker(ctx => densityDisplayStatTexture(
            ctx.stateTrader.currentTexture, ctx.wireCount, ctx.controls, ctx.row, span)).
        setStatPixelDataPostProcessor(densityPixelsToMatrix);
}