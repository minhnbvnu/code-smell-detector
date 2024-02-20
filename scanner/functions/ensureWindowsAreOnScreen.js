function ensureWindowsAreOnScreen() {
  return (dispatch, getState) => {
    const state = getState();
    const windowsInfo = getWindowsInfo(state);
    const getOpen = selectors_getWindowOpen(state);
    const {
      height,
      width
    } = utils_getWindowSize();
    const bounding = calculateBoundingBox(windowsInfo.filter(w => getOpen(w.key)));

    if (bounding == null) {
      // There are no windows visible, so there's no work to do.
      return;
    }

    const positions = getWindowPositions(state); // Are we good?

    if (bounding.left >= 0 && bounding.top >= 0 && bounding.right <= width && bounding.bottom <= height) {
      // My work here is done.
      return;
    }

    const boundingHeight = bounding.bottom - bounding.top;
    const boundingWidth = bounding.right - bounding.left; // Could we simply shift all the windows by a constant offset?

    if (boundingWidth <= width && boundingHeight <= height) {
      let moveY = 0;
      let moveX = 0;

      if (bounding.top <= 0) {
        moveY = bounding.top;
      } else if (bounding.bottom > height) {
        moveY = bounding.bottom - height;
      }

      if (bounding.left <= 0) {
        moveX = bounding.left;
      } else if (bounding.right > width) {
        moveX = bounding.right - width;
      }

      const newPositions = objectMap(positions, position => ({
        x: position.x - moveX,
        y: position.y - moveY
      }));
      dispatch(windows_updateWindowPositions(newPositions));
      return;
    } // TODO: Try moving the individual groups to try to fit them in
    // I give up. Just reset everything.


    dispatch(resetWindowSizes());
    dispatch(stackWindows());
    dispatch(centerWindowsInView());
  };
}