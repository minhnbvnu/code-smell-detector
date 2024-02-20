function extractBrush(colorOrBrush, props) {
  if (colorOrBrush == null) {
    return null;
  }
  if (colorOrBrush._brush) {
    if (colorOrBrush._bb) {
      // The legacy API for Gradients allow for the bounding box to be used
      // as a convenience for specifying gradient positions. This should be
      // deprecated. It's not properly implemented in canvas mode. ReactART
      // doesn't handle update to the bounding box correctly. That's why we
      // mutate this so that if it's reused, we reuse the same resolved box.
      applyBoundingBoxToBrushData(colorOrBrush._brush, props);
      colorOrBrush._bb = false;
    }
    return colorOrBrush._brush;
  }
  var c = new Color(colorOrBrush);
  return [SOLID_COLOR, c.red / 255, c.green / 255, c.blue / 255, c.alpha];
}