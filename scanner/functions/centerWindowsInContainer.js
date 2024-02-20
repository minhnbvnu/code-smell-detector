function centerWindowsInContainer(container) {
  return (dispatch, getState) => {
    if (!getPositionsAreRelative(getState())) {
      return;
    }

    const {
      left,
      top
    } = container.getBoundingClientRect();
    const {
      scrollWidth: width,
      scrollHeight: height
    } = container;
    dispatch(centerWindows({
      left,
      top,
      width,
      height
    }));
  };
}