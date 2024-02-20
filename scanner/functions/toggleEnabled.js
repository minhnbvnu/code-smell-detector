function toggleEnabled(value) {
  isEnabled = value;

  if (!isEnabled) {
    nodeToData.clear();

    if (drawAnimationFrameID !== null) {
      cancelAnimationFrame(drawAnimationFrameID);
      drawAnimationFrameID = null;
    }

    if (redrawTimeoutID !== null) {
      clearTimeout(redrawTimeoutID);
      redrawTimeoutID = null;
    }

    destroy();
  }
}