function saveDrawingSurface() {
   drawingSurfaceImageData = drawingContext.getImageData(0, 0,
                             drawingCanvas.width,
                             drawingCanvas.height);
}