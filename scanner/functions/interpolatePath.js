function interpolatePath(pathCtx, x1, y1, x2, y2, r) {

    pathCtx.strokeStyle = paintColor;
    pathCtx.fillStyle = paintColor;

    // Draw rectangle from last point
    pathCtx.beginPath();
    pathCtx.moveTo(x1,y1);
    pathCtx.lineTo(x2,y2);
    pathCtx.closePath();
    pathCtx.lineWidth = 2 * r;
    pathCtx.stroke();

    // Draw the circle at the end
    pathCtx.beginPath();
    pathCtx.arc(x2, y2, r, 0, Math.PI * 2);
    pathCtx.closePath();
    pathCtx.fill();
}