function setPreamp(value) {
  return {
    type: SET_BAND_VALUE,
    band: "preamp",
    value: _snapBandValue(value)
  };
}