function bSplineInterpolation({
  data,
  degree = 3,
  range,
  includeExtremes = false,
  removePointsSurroundingExtremes = true,
}) {
  if (!data || data.length === 0) {
    return () => [];
  }
  const parsed = data.map(({ x, y }) => [x, y]);
  const spline = new BSpline(parsed, degree, true);

  const res = [];
  for (let i = 0; i < range; i++) {
    res.push(spline.calcAt(i / (range - 1)));
  }
  return addExtremesIfNeeded(
    res.map(([x, y]) => ({ x, y })),
    data,
    includeExtremes,
    removePointsSurroundingExtremes
  );
}