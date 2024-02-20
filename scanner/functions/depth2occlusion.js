function depth2occlusion(depthCol, newCol, threshold) {
    return new DepthToOcclusionExpr(depthCol, newCol, expr_1.wrapInValue(threshold));
}