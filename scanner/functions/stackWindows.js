function stackWindows() {
  return (dispatch, getState) => {
    dispatch(windows_updateWindowPositions(getStackedLayoutPositions(getState())));
  };
}