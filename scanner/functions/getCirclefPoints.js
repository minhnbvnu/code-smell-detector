function getCirclefPoints(radius, start, end) {
  const angleStep = 5
  let points = []
  for (
    let angle = start;
    angle < end;
    angle += ((2 * Math.PI) / 360) * angleStep
  ) {
    points.push({
      x: Math.cos(angle) * radius * DEFORMATION_FACTOR,
      y: Math.sin(angle) * radius,
      angle,
    })
  }
  return points
}