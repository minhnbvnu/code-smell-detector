function getRectangularDistance(a, b) {
    if (overlaps(a, b)) return 0
    let dx = 0
    let dy = 0

    if (a.right < b.left) {
      dx = b.right - a.left
    } else if (b.right < a.left) {
      dx = a.left - b.right
    }

    if (a.top < b.bottom) {
      dy = b.bottom - a.top
    } else if (b.top < a.bottom) {
      dy = a.bottom - b.top
    }

    return Math.sqrt(dx * dx + dy * dy)
  }