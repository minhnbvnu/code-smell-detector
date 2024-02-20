function _setEqTo(value) {
  return dispatch => {
    Object.values(BANDS).forEach(band => {
      dispatch({
        type: SET_BAND_VALUE,
        value,
        band: band
      });
    });
  };
}