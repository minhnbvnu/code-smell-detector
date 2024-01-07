function setLineDash(ctx, lineDashArray) {
    if (!lineDashArray || !ctx.setLineDash || !Array.isArray(lineDashArray)) {
        return;
    }
    ctx.setLineDash(lineDashArray);

}