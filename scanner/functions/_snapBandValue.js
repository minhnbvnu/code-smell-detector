function _snapBandValue(value) {
  if (value < BAND_MID_POINT_VALUE + BAND_SNAP_DISTANCE && value > BAND_MID_POINT_VALUE - BAND_SNAP_DISTANCE) {
    return BAND_MID_POINT_VALUE;
  }

  return value;
}