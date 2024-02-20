function getBrushPoints(x, y, angle) {
  let newX = 0
  let newY = 0
  let points = []
  const halfBrushWidth = BRUSH_WIDTH / 2

  const oppositeAngle = angle + Math.PI

  for (let step = 0; step < halfBrushWidth * DEFORMATION_FACTOR; step++) {
    newX =
      x +
      Math.cos(angle) *
        ((halfBrushWidth / (halfBrushWidth * DEFORMATION_FACTOR)) * step) *
        DEFORMATION_FACTOR
    newY =
      y +
      Math.sin(angle) *
        ((halfBrushWidth / (halfBrushWidth * DEFORMATION_FACTOR)) * step)
    points.push({ x: newX, y: newY })

    newX =
      x +
      Math.cos(oppositeAngle) *
        ((halfBrushWidth / (halfBrushWidth * DEFORMATION_FACTOR)) * step) *
        DEFORMATION_FACTOR
    newY =
      y +
      Math.sin(oppositeAngle) *
        ((halfBrushWidth / (halfBrushWidth * DEFORMATION_FACTOR)) * step)
    points.push({ x: newX, y: newY })
  }
  return points
}