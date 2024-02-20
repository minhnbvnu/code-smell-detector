function roundPoint(point, f = 1e12) {
  return [
    Math.round(point[0]*f) / f,
    Math.round(point[1]*f) / f
  ]
}