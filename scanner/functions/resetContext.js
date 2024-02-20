function resetContext() {
      if (isContextReplaced) {
        curContext = originalContext;
        isContextReplaced = false;
        p.updatePixels()
      }
    }