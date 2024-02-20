function executeContextFill() {
      if (doFill) {
        if (isFillDirty) {
          curContext.fillStyle = p.color.toString(currentFillColor);
          isFillDirty = false
        }
        curContext.fill()
      }
    }