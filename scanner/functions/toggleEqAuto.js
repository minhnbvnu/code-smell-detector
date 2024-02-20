function toggleEqAuto() {
  return dispatch => {
    // We don't actually support this feature yet so don't let the user ever turn it on.
    // dispatch({ type: SET_EQ_AUTO, value: !getState().equalizer.auto });
    dispatch({
      type: SET_EQ_AUTO,
      value: false
    });
  };
}