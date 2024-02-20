function usePaintBar({
  renderHeight,
  height
}) {
  const colors = useTypedSelector(getSkinColors);
  const getWindowShade = useTypedSelector(selectors_getWindowShade);
  const windowShade = getWindowShade("main");
  const barCanvas = Object(react["useMemo"])(() => {
    return preRenderBar(height, colors, renderHeight);
  }, [colors, height, renderHeight]);
  return Object(react["useCallback"])((ctx, x, barHeight, peakHeight) => {
    barHeight = Math.ceil(barHeight) * useBarVisualizer_PIXEL_DENSITY;
    peakHeight = Math.ceil(peakHeight) * useBarVisualizer_PIXEL_DENSITY;

    if (barHeight > 0 || peakHeight > 0) {
      const y = height - barHeight; // Draw the gradient

      const b = BAR_WIDTH;

      if (height > 0) {
        ctx.drawImage(barCanvas, 0, y, b, height, x, y, b, height);
      } // Draw the gray peak line


      if (!windowShade) {
        const peakY = height - peakHeight;
        ctx.fillStyle = colors[PEAK_COLOR_INDEX];
        ctx.fillRect(x, peakY, b, useBarVisualizer_PIXEL_DENSITY);
      }
    }
  }, [barCanvas, colors, height, windowShade]);
}