function applyTransform(extent, transformFn, dest, stops) {
  if (isEmpty(extent)) {
    return createOrUpdateEmpty(dest);
  }
  let coordinates = [];
  if (stops > 1) {
    const width = extent[2] - extent[0];
    const height = extent[3] - extent[1];
    for (let i = 0; i < stops; ++i) {
      coordinates.push(
        extent[0] + (width * i) / stops,
        extent[1],
        extent[2],
        extent[1] + (height * i) / stops,
        extent[2] - (width * i) / stops,
        extent[3],
        extent[0],
        extent[3] - (height * i) / stops,
      );
    }
  } else {
    coordinates = [
      extent[0],
      extent[1],
      extent[2],
      extent[1],
      extent[2],
      extent[3],
      extent[0],
      extent[3],
    ];
  }
  transformFn(coordinates, coordinates, 2);
  const xs = [];
  const ys = [];
  for (let i = 0, l = coordinates.length; i < l; i += 2) {
    xs.push(coordinates[i]);
    ys.push(coordinates[i + 1]);
  }
  return _boundingExtentXYs(xs, ys, dest);
}