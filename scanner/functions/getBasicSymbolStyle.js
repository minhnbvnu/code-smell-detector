function getBasicSymbolStyle(item) {
  // TODO: handle opacity
  var style = {};
  var stroke, fill;
  style.opacity = roundTo(getComputedOpacity(item) / 100, 2);
  if (getBlendMode(item) == BlendModes.MULTIPLY) {
    style.multiply = true;
  }
  if (item.filled) {
    fill = convertAiColor(item.fillColor);
    style.fill = fill.color;
  }
  if (item.stroked) {
    stroke = convertAiColor(item.strokeColor);
    style.stroke = stroke.color;
    // Chrome doesn't consistently render borders that are less than 1px, which
    // can cause lines to disappear or flicker as the window is resized.
    style.strokeWidth = item.strokeWidth < 1 ? 1 : Math.round(item.strokeWidth);
  }
  return style;
}