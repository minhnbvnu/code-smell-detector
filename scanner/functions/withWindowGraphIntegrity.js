function withWindowGraphIntegrity(action) {
  return (dispatch, getState) => {
    const state = getState();
    const graph = getWindowGraph(state);
    const originalSizes = getWindowSizes(state);
    dispatch(action);
    const newSizes = getWindowSizes(getState());
    const sizeDiff = {};

    for (const window of Object.keys(newSizes)) {
      const original = originalSizes[window];
      const current = newSizes[window];
      sizeDiff[window] = {
        height: current.height - original.height,
        width: current.width - original.width
      };
    }

    const positionDiff = getPositionDiff(graph, sizeDiff);
    const windowPositions = getWindowPositions(state);
    const newPositions = objectMap(windowPositions, (position, key) => applyDiff(position, positionDiff[key]));
    dispatch(windows_updateWindowPositions(newPositions));
  };
}