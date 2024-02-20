function getRectangularPath(closestStartPoint) {
  let points = []
  const verticalMargin = BRUSH_WIDTH / 2
  const horizontalMargin = (BRUSH_WIDTH * DEFORMATION_FACTOR) / 2
  const startPoint = { x: closestStartPoint.x, y: ROWS - verticalMargin }

  for (let x = startPoint.x; x > -2; x--) {
    points.push({ y: ROWS - verticalMargin + 1, x, angle: Math.PI / 2 })
  }

  let anglePoints = getCirclefPoints(
    Math.floor(BRUSH_WIDTH / 2),
    0,
    Math.PI / 2,
  )
  anglePoints = anglePoints
    .map((point) => ({
      x: point.x,
      y: point.y + ROWS - verticalMargin * 2,
      angle: point.angle,
    }))
    .reverse()
  points = [...points, ...anglePoints]

  for (let y = ROWS - verticalMargin - 3; y > -1; y--) {
    points.push({ y, x: horizontalMargin - 1, angle: Math.PI })
    points.push({ y, x: horizontalMargin - 1, angle: Math.PI })
  }

  let anglePoints2 = getCirclefPoints(
    Math.floor(BRUSH_WIDTH / 2),
    Math.PI,
    (Math.PI * 3) / 2,
  ).reverse()
  anglePoints2 = anglePoints2
    .map((point) => ({
      x: point.x + horizontalMargin * 2,
      y: point.y,
      angle: point.angle,
    }))
    .reverse()
  points = [...points, ...anglePoints2]

  for (let x = horizontalMargin + 3; x < COLUMNS; x++) {
    points.push({ y: verticalMargin - 1, x, angle: Math.PI / 2 })
  }

  let anglePoints3 = getCirclefPoints(
    Math.floor(BRUSH_WIDTH / 2),
    Math.PI,
    (Math.PI * 3) / 2,
  ).reverse()
  anglePoints3 = anglePoints3.map((point) => ({
    x: point.x + COLUMNS,
    y: point.y + verticalMargin * 2,
    angle: point.angle,
  }))
  points = [...points, ...anglePoints3]

  for (let y = verticalMargin + 3; y < ROWS; y++) {
    points.push({ y, x: COLUMNS - horizontalMargin, angle: Math.PI })
    points.push({ y, x: COLUMNS - horizontalMargin, angle: Math.PI })
  }

  let anglePoints4 = getCirclefPoints(
    Math.floor(BRUSH_WIDTH / 2),
    (Math.PI * 3) / 2,
    (Math.PI * 4) / 2,
  )
  anglePoints4 = anglePoints4
    .map((point) => ({
      x: point.x + COLUMNS - horizontalMargin * 2,
      y: point.y + ROWS,
      angle: point.angle,
    }))
    .reverse()
  points = [...points, ...anglePoints4]

  for (let x = COLUMNS - horizontalMargin - 3; x > startPoint.x; x--) {
    points.push({ y: ROWS - verticalMargin, x, angle: Math.PI / 2 })
  }
  return points
}