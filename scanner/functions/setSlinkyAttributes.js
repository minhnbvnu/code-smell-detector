function setSlinkyAttributes() {
  drawingContext.lineWidth     = lineWidthSelect.value;
  drawingContext.shadowColor   = strokeStyleSelect.value;
  drawingContext.shadowOffsetX = SLINKY_SHADOW_OFFSET; 
  drawingContext.shadowOffsetY = SLINKY_SHADOW_OFFSET;
  drawingContext.shadowBlur    = SLINKY_SHADOW_BLUR;
  drawingContext.strokeStyle   = strokeStyleSelect.value;
}