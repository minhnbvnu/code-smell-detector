function populateBrushSize() {
    var biggerDimension = Math.max(canvas.width, canvas.height);
    brushSize = Math.floor((document.getElementById('brushSizeSlider').value * biggerDimension) / brushAdjustment);
    setCursor();
}