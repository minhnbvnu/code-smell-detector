function tapDraw(pathCtx, mouseX, mouseY, r) {

    pathCtx.strokeStyle = paintColor;
    pathCtx.fillStyle = paintColor;

    // Draw the circle at the end
    pathCtx.beginPath();
    pathCtx.arc(mouseX, mouseY, r, 0, Math.PI * 2);
    pathCtx.closePath();
    pathCtx.fill();
}