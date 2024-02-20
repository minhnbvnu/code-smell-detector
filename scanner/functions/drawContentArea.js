function drawContentArea(w, h, paddingValues) {
    w -= outlineWidth;
    h -= outlineWidth;
    ctx.fillStyle = CONTENT_AREA_COLOR;
    var outlineHalf = Math.round(outlineWidth / 2);
    var x = getRelativeX() + outlineHalf;
    var y = getRelativeY() + outlineHalf;
    var xPad = paddingValues.horizontalLeft * w;
    var yPad = paddingValues.verticalTop * h;
    ctx.fillRect(x + xPad, y + yPad,
        w - (w * paddingValues.horizontalRight) - xPad, h - (h * paddingValues.verticalBottom) - yPad);
}