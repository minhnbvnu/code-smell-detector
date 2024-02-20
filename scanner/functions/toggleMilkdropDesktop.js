function toggleMilkdropDesktop() {
  return (dispatch, getState) => {
    if (getMilkdropDesktopEnabled(getState())) {
      dispatch({
        type: SET_MILKDROP_DESKTOP,
        enabled: false
      });
    } else {
      dispatch({
        type: SET_MILKDROP_DESKTOP,
        enabled: true
      });
    }
  };
}