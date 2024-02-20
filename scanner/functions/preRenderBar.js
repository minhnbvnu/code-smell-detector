function preRenderBar(height, colors, renderHeight) {
  /**
   * The order of the colours is commented in the file: the fist two colours
   * define the background and dots (check it to see what are the dots), the
   * next 16 colours are the analyzer's colours from top to bottom, the next
   * 5 colours are the oscilloscope's ones, from center to top/bottom, the
   * last colour is for the analyzer's peak markers.
   */
  // Off-screen canvas for pre-rendering a single bar gradient
  const barCanvas = document.createElement("canvas");
  barCanvas.width = BAR_WIDTH;
  barCanvas.height = height;
  const offset = 2; // The first two colors are for the background;

  const gradientColors = colors.slice(offset, offset + GRADIENT_COLOR_COUNT);
  const barCanvasCtx = barCanvas.getContext("2d");

  if (barCanvasCtx == null) {
    throw new Error("Could not construct canvas context");
  }

  const multiplier = GRADIENT_COLOR_COUNT / renderHeight; // In shade mode, the five colors are, from top to bottom:
  // 214, 102, 0 -- 3
  // 222, 165, 24 -- 6
  // 148, 222, 33 -- 9
  // 57, 181, 16 -- 12
  // 24, 132, 8 -- 15
  // TODO: This could probably be improved by iterating backwards

  for (let i = 0; i < renderHeight; i++) {
    const colorIndex = GRADIENT_COLOR_COUNT - 1 - Math.floor(i * multiplier);
    barCanvasCtx.fillStyle = gradientColors[colorIndex];
    const y = height - i * useBarVisualizer_PIXEL_DENSITY;
    barCanvasCtx.fillRect(0, y, BAR_WIDTH, useBarVisualizer_PIXEL_DENSITY);
  }

  return barCanvas;
}