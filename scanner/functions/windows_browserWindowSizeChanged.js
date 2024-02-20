function windows_browserWindowSizeChanged(size) {
  return dispatch => {
    dispatch(actionCreators_windows_objectSpread({
      type: BROWSER_WINDOW_SIZE_CHANGED
    }, size));
    dispatch(ensureWindowsAreOnScreen());
  };
}