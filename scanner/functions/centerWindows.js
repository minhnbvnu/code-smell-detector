function centerWindows(box) {
  return (dispatch, getState) => {
    const state = getState();
    const windowsInfo = getWindowsInfo(state);
    const getOpen = selectors_getWindowOpen(state);
    const {
      top,
      left,
      width,
      height
    } = box;
    const offsetLeft = left + window.scrollX;
    const offsetTop = top + window.scrollY; // A layout has been suplied. We will compute the bounding box and
    // center the given layout.

    const bounding = calculateBoundingBox(windowsInfo.filter(w => getOpen(w.key)));

    if (bounding == null) {
      // There are no windows to center
      return;
    }

    const boxHeight = bounding.bottom - bounding.top;
    const boxWidth = bounding.right - bounding.left;
    const move = {
      x: Math.ceil(offsetLeft - bounding.left + (width - boxWidth) / 2),
      y: Math.ceil(offsetTop - bounding.top + (height - boxHeight) / 2)
    };
    const newPositions = windowsInfo.reduce((pos, w) => actionCreators_windows_objectSpread(actionCreators_windows_objectSpread({}, pos), {}, {
      [w.key]: {
        x: move.x + w.x,
        y: move.y + w.y
      }
    }), {});
    dispatch(windows_updateWindowPositions(newPositions, true));
  };
}