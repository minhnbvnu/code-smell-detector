function getOverlapFactor (a, b) {
    const dx = Math.abs(a.cx - b.cx)
    const dy = Math.abs(a.cy - b.cy)

    const wx = (a.width + b.width) / 2
    const wy = (a.height + b.height) / 2

    const t = Math.min(wx / dx, wy / dy)
    return t
  }