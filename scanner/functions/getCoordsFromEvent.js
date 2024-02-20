function getCoordsFromEvent(e) {
    return {
      x: parseInt(e.clientX, 10) + window.scrollX,
      y: parseInt(e.clientY, 10) + window.scrollY,
    };
  }