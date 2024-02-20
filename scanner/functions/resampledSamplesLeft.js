function resampledSamplesLeft() {
  return ((resampleBufferStart <= resampleBufferEnd) ? 0 : resampleBufferSize) + resampleBufferEnd - resampleBufferStart;
}