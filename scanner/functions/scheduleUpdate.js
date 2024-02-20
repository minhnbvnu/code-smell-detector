function scheduleUpdate() {
    if (0 < scheduled || acyclicEquals(updatedAt, getPos())) return
    scheduled = 2
    setTimeout(() => {
      if (0 < scheduled) --scheduled
      if (!scheduled) scheduleUpdate()
    }, 300)
    window.requestAnimationFrame(update)
  }