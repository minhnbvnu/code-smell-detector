function removeOverlapsForRectangles(rootPos, childPos) {
    if (overlaps(rootPos, childPos)) {
      let t = getOverlapFactor(rootPos, childPos)
      let dx = (childPos.cx - rootPos.cx)
      let dy = (childPos.cy - rootPos.cy)

      if (!Number.isFinite(t)) {
        t = 1
        dx = 1e-3
        dy = -1e-3
      }

      if (canMove(childPos.id)) {
        childPos.cx = rootPos.cx + t * dx
        childPos.cy = rootPos.cy + t * dy
      } else {
        rootPos.cx = childPos.cx - t * dx
        rootPos.cy = childPos.cy - t * dy
      }
    }
  }