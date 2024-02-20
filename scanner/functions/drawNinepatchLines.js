function drawNinepatchLines(w, h, paddingValues) {
    if (hideNinepatches) {
        return;
    }

    var s = 0;
    var offsetX = getRelativeX();
    var offsetY = getRelativeY();
    var ninepatchLineWidth = 1;
    var width = canvas.width;
    var height = canvas.height;

    //Subtract outline width from content padding
    if (!isTransparentFill) {
        var outlineHalf = Math.round(outlineWidth / 2);
        w -= outlineWidth;
        h -= outlineWidth;
        offsetX += outlineHalf;
        offsetY += outlineHalf;
    }

    //Clear 1px frame around image for ninepatch pixels
    //Top
    ctx.clearRect(0, 0, width, ninepatchLineWidth);
    //Bottom
    ctx.clearRect(0, height - ninepatchLineWidth, width, ninepatchLineWidth);
    //Left
    ctx.clearRect(0, 0, ninepatchLineWidth, height);
    //Right
    ctx.clearRect(width - ninepatchLineWidth, 0, ninepatchLineWidth, height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = ninepatchLineWidth * 2;

    ctx.beginPath();

    //Draw left
    s = h / 2;
    ctx.moveTo(0, Math.round(offsetY + s - NINEPATCH_SIZING_WIDTH / 2));
    ctx.lineTo(0, Math.round(offsetY + s + NINEPATCH_SIZING_WIDTH));

    //Draw top
    s = w / 2;
    ctx.moveTo(Math.round(offsetX + s - NINEPATCH_SIZING_WIDTH / 2), 0);
    ctx.lineTo(Math.round(offsetX + s + NINEPATCH_SIZING_WIDTH), 0);

    //Draw right
    ctx.moveTo(Math.round(width), Math.round(offsetY + (h * paddingValues.verticalTop)));
    ctx.lineTo(Math.round(width), Math.round(offsetY + h - (h * paddingValues.verticalBottom - ninepatchLineWidth)));

    //Draw bottom
    ctx.moveTo(Math.round(offsetX + (w * paddingValues.horizontalLeft)), Math.round(height));
    ctx.lineTo(Math.round(offsetX + w - (w * paddingValues.horizontalRight)), Math.round(height));

    ctx.closePath();
    ctx.stroke();

    //Clear right top corner
    ctx.clearRect(width - ninepatchLineWidth, 0, ninepatchLineWidth, ninepatchLineWidth);
    //Clear right bottom corner
    ctx.clearRect(width - ninepatchLineWidth, height - ninepatchLineWidth, ninepatchLineWidth, ninepatchLineWidth);
    //Clear left bottom corner
    ctx.clearRect(0, height - ninepatchLineWidth, ninepatchLineWidth, ninepatchLineWidth);
}