function copyProperties(ctx, savedCtx) {
    ctx.filter = savedCtx.filter;
    ctx.fillStyle = savedCtx.fillStyle;
    ctx.globalAlpha = savedCtx.globalAlpha;
    ctx.lineCap = savedCtx.lineCap;
    ctx.lineDashOffset = savedCtx.lineDashOffset;
    ctx.lineJoin = savedCtx.lineJoin;
    ctx.lineWidth = savedCtx.lineWidth;
    ctx.shadowBlur = savedCtx.shadowBlur;
    ctx.shadowColor = savedCtx.shadowColor;
    ctx.shadowOffsetX = savedCtx.shadowOffsetX;
    ctx.shadowOffsetY = savedCtx.shadowOffsetY;
    ctx.strokeStyle = savedCtx.strokeStyle;
}