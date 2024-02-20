function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }