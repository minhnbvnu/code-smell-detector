function drawShadow(w, h, radius, fast) {
    var paddingValues = getPaddingValues();

    //First time draw with filled background
    //for calculating final size of ninepatch
    if (!fast) {
        predraw(w, h, radius);
    }

    //Set canvas size to calculated size
    canvas.width = boundPos.canvasWidth;
    canvas.height = boundPos.canvasHeight;

    ctx.save();
    ctx.fillStyle = backgroundFillColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    drawShadowInternal(w, h, radius, false, true);

    drawNinepatchLines(w, h, paddingValues);


    if (showContentArea) {
        drawContentArea(w, h, paddingValues);
    }
}