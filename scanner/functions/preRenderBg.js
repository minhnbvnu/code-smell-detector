function preRenderBg(width, height, bgColor, fgColor, windowShade) {
  // Off-screen canvas for pre-rendering the background
  const bgCanvas = document.createElement("canvas");
  bgCanvas.width = width;
  bgCanvas.height = height;
  const distance = 2 * Visualizer_PIXEL_DENSITY;
  const bgCanvasCtx = bgCanvas.getContext("2d");

  if (bgCanvasCtx == null) {
    throw new Error("Could not construct canvas context");
  }

  bgCanvasCtx.fillStyle = bgColor;
  bgCanvasCtx.fillRect(0, 0, width, height);

  if (!windowShade) {
    bgCanvasCtx.fillStyle = fgColor;

    for (let x = 0; x < width; x += distance) {
      for (let y = Visualizer_PIXEL_DENSITY; y < height; y += distance) {
        bgCanvasCtx.fillRect(x, y, Visualizer_PIXEL_DENSITY, Visualizer_PIXEL_DENSITY);
      }
    }
  }

  return bgCanvas;
}