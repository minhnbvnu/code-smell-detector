function drawCurve() {
   drawingContext.beginPath();
   drawingContext.moveTo(curveStart.x, curveStart.y);
   drawingContext.quadraticCurveTo(controlPoint.x, controlPoint.y,
                                   curveEnd.x, curveEnd.y);
   drawingContext.stroke();
}