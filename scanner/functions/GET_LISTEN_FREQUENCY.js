function GET_LISTEN_FREQUENCY() {
  return FREQ_INTERPOLATOR(Math.min(FREQ_INTERPOLATION, 1.0));
}