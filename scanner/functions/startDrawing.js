function startDrawing(speed = 150) {
  const msPerFrame = 1000 / speed
  const zigZagPath = getZigZagPath()
  const rectangulaPath = getRectangularPath(zigZagPath[zigZagPath.length - 1])
  const finalPath = [...zigZagPath, ...rectangulaPath]

  finalPath.forEach((point, index) => {
    const BurshPoints = getBrushPoints(point.x, point.y, point.angle)

    //draw Brush
    setTimeout(() => {
      drawPoints(BurshPoints)
    }, index * msPerFrame)

    //erase brush with a DELAY
    if (index + DELAY >= 0)
      setTimeout(() => {
        drawPoints(BurshPoints, ' ')
      }, (index + DELAY) * msPerFrame)
  })

  //clear the screen and remove all log
  setTimeout(() => {
    process.stdout.cursorTo(0, 0)
    process.stdout.write('\x1Bc')
  }, (finalPath.length + DELAY) * msPerFrame)
}