function getWPixelSize(w, doubled) {
  const [width, height] = w.size;
  const doubledMultiplier = doubled && w.canDouble ? 2 : 1;
  const pix = {
    height: selectors_WINDOW_HEIGHT + height * WINDOW_RESIZE_SEGMENT_HEIGHT,
    width: WINDOW_WIDTH + width * WINDOW_RESIZE_SEGMENT_WIDTH
  };
  return {
    height: (w.shade ? SHADE_WINDOW_HEIGHT : pix.height) * doubledMultiplier,
    width: pix.width * doubledMultiplier
  };
}