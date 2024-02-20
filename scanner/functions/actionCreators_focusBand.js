function actionCreators_focusBand(band) {
  return {
    type: SET_BAND_FOCUS,
    input: "eq",
    bandFocused: band
  };
}