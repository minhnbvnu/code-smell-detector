function drawPoints(list, character = '#') {
  list.forEach((point) => {
    if (point.y < ROWS && point.x < COLUMNS)
      drawnStringAt(point.x, point.y, character)
  })
}