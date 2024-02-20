function isLayoutReady({ steps, rootViewport, elHeights }) {
  // Wait until we now the parent's width/height
  if (!rootViewport) {
    return false;
  }

  // Wait until we now the layout of all steps
  // NOTE: This means all steps are rendered from the start
  if (Object.keys(elHeights).length < getStepsNum(steps)) {
    return false;
  }

  return true;
}