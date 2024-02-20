function drawTextCursor() {
  var widthMetric = drawingContext.measureText(currentText),
      heightMetric = drawingContext.measureText('W'),
      cursorLoc = {
        x: mousedown.x + widthMetric.width,
        y: mousedown.y - heightMetric.width + 5
      };

   drawingContext.beginPath();
   drawingContext.moveTo(cursorLoc.x, cursorLoc.y);
   drawingContext.lineTo(cursorLoc.x, cursorLoc.y + heightMetric.width - 12);
   drawingContext.stroke();
}