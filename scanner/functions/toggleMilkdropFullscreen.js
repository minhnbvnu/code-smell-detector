function toggleMilkdropFullscreen() {
  return (dispatch, getState) => {
    dispatch(setMilkdropFullscreen(!getMilkdropFullscreenEnabled(getState())));
  };
}