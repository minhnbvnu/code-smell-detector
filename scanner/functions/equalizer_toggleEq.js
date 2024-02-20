function equalizer_toggleEq() {
  return (dispatch, getState) => {
    if (getState().equalizer.on) {
      dispatch({
        type: SET_EQ_OFF
      });
    } else {
      dispatch({
        type: SET_EQ_ON
      });
    }
  };
}