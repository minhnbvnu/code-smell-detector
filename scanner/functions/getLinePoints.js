function getLinePoints(startX, startY, endX, endY) {
  let points = []
  const Ystep = (endY - startY) / Math.abs(endX - startX)
  const Xdirection = endX > startX ? 1 : -1
  const angle = -Math.atan((endY - startX) / startY - endY)
  for (let step = 0; step < Math.abs(endX - startX); step++) {
    points.push({
      x: step * Xdirection + startX,
      y: startY + Ystep * step,
      angle,
    })
  }
  return points
}