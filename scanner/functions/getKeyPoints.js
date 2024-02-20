function getKeyPoints() {
  let points = []
  const halfBrushDeformed = (BRUSH_WIDTH * DEFORMATION_FACTOR) / 2
  let step = 0

  while ((BRUSH_WIDTH / 2) * 3 + (step - 1) * BRUSH_WIDTH < ROWS) {
    points.push([
      {
        x: halfBrushDeformed * 2,
        y: (BRUSH_WIDTH / 2) * 2 + step * BRUSH_WIDTH,
      },
      {
        x: COLUMNS - halfBrushDeformed * 2,
        y: (BRUSH_WIDTH / 2) * 1 + step * BRUSH_WIDTH,
      },
    ])
    points.push([
      {
        x: COLUMNS - halfBrushDeformed * 2,
        y: (BRUSH_WIDTH / 2) * 3 + step * BRUSH_WIDTH,
      },
      {
        x: halfBrushDeformed * 2,
        y: (BRUSH_WIDTH / 2) * 2 + step * BRUSH_WIDTH,
      },
    ])
    step++
  }
  return points
}