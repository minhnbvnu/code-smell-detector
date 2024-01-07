function getGeometryLayout(object) {
  /** @type {import("../geom/Geometry.js").GeometryLayout} */
  let layout = 'XY';
  if (object.hasZ === true && object.hasM === true) {
    layout = 'XYZM';
  } else if (object.hasZ === true) {
    layout = 'XYZ';
  } else if (object.hasM === true) {
    layout = 'XYM';
  }
  return layout;
}