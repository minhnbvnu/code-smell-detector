function getZigZagPath() {
  //get half circle path
  const circlePointsLeft = getCirclefPoints(
    Math.floor(BRUSH_WIDTH / 2),
    Math.PI / 2,
    (Math.PI * 3) / 2,
  ).reverse()
  const circlePointsRight = getCirclefPoints(
    Math.floor(BRUSH_WIDTH / 2),
    (Math.PI * 3) / 2,
    (Math.PI * 5) / 2,
  )

  //points by which the squeegee
  const keyPoints = getKeyPoints()

  let points = []
  for (let step = 0; step < keyPoints.length; step++) {
    const linePoints = getLinePoints(
      keyPoints[step][0].x,
      keyPoints[step][0].y,
      keyPoints[step][1].x,
      keyPoints[step][1].y,
    )
    const turnPoints = (
      step % 2 == 0 ? circlePointsRight : circlePointsLeft
    ).map((point) => ({
      x: point.x + keyPoints[step][1].x,
      y: point.y + keyPoints[step][1].y + BRUSH_WIDTH / 2,
      angle: point.angle,
    }))
    points = [...points, ...linePoints, ...turnPoints]
  }
  return points
}