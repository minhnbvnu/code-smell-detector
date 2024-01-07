function getBBox(data) {
  const def = -1;

  if (!data) {
    return {
      x: def,
      y: def,
      width: def,
      height: def
    };
  }

  const bbox = data.trim().split(/\s*,\s*/).map(m => getMeasurement(m, "-1"));

  if (bbox.length < 4 || bbox[2] < 0 || bbox[3] < 0) {
    return {
      x: def,
      y: def,
      width: def,
      height: def
    };
  }

  const [x, y, width, height] = bbox;
  return {
    x,
    y,
    width,
    height
  };
}