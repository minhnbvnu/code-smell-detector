function actionCreators_togglePresetOverlay() {
  return (dispatch, getState) => {
    if (getPresetOverlayOpen(getState())) {
      dispatch(windows_setFocusedWindow(WINDOWS.MILKDROP));
    }

    dispatch({
      type: TOGGLE_PRESET_OVERLAY
    });
  };
}