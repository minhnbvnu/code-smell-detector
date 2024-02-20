function setEqBand(band, value) {
  return {
    type: SET_BAND_VALUE,
    band,
    value: _snapBandValue(value)
  };
}