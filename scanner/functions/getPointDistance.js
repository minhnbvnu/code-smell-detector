function getPointDistance(a, b) {
    const dx = a.cx - b.cx
    const dy = a.cy - b.cy

    return Math.sqrt(dx * dx + dy * dy)
  }