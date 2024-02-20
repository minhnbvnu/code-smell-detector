function RadialGradient(stops, fx, fy, rx, ry, cx, cy) {
  if (ry == null) {
    ry = rx;
  }
  if (cx == null) {
    cx = fx;
  }
  if (cy == null) {
    cy = fy;
  }
  if (fx == null) {
    // As a convenience we allow the whole radial gradient to cover the
    // bounding box. We should consider dropping this API.
    fx = fy = rx = ry = cx = cy = 0.5;
    this._bb = true;
  } else {
    this._bb = false;
  }
  // The ART API expects the radial gradient to be repeated at the edges.
  // To simulate this we render the gradient twice as large and add double
  // color stops. Ideally this API would become more restrictive so that this
  // extra work isn't needed.
  var brushData = [RADIAL_GRADIENT, +fx, +fy, +rx * 2, +ry * 2, +cx, +cy];
  insertDoubleColorStopsIntoArray(stops, brushData, 7);
  this._brush = brushData;
}