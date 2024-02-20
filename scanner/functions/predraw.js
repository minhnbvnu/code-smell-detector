function predraw(w, h, radius) {
    canvas.width = CANVAS_MAX_WIDTH;
    canvas.height = CANVAS_MAX_HEIGHT;

    var transparentTmp = isTransparentFill;
    isTransparentFill = false;
    drawShadowInternal(w, h, radius, true);

    updateBounds(w, h);

    isTransparentFill = transparentTmp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}