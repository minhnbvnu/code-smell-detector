function drawCurrentText() {
   if (doFill)
      drawingContext.fillText(currentText, mousedown.x, mousedown.y);

   drawingContext.strokeText(currentText, mousedown.x, mousedown.y);
}