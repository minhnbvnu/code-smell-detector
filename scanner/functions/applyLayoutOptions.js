function applyLayoutOptions(layoutOptions, flatCoordinates, ends) {
  /** @type {import("../geom/Geometry.js").GeometryLayout} */
  let layout = 'XY';
  let stride = 2;
  if (layoutOptions.hasZ && layoutOptions.hasM) {
    layout = 'XYZM';
    stride = 4;
  } else if (layoutOptions.hasZ) {
    layout = 'XYZ';
    stride = 3;
  } else if (layoutOptions.hasM) {
    layout = 'XYM';
    stride = 3;
  }
  if (stride !== 4) {
    for (let i = 0, ii = flatCoordinates.length / 4; i < ii; i++) {
      flatCoordinates[i * stride] = flatCoordinates[i * 4];
      flatCoordinates[i * stride + 1] = flatCoordinates[i * 4 + 1];
      if (layoutOptions.hasZ) {
        flatCoordinates[i * stride + 2] = flatCoordinates[i * 4 + 2];
      }
      if (layoutOptions.hasM) {
        flatCoordinates[i * stride + 2] = flatCoordinates[i * 4 + 3];
      }
    }
    flatCoordinates.length = (flatCoordinates.length / 4) * stride;
    if (ends) {
      for (let i = 0, ii = ends.length; i < ii; i++) {
        ends[i] = (ends[i] / 4) * stride;
      }
    }
  }
  return layout;
}