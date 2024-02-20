function setRateFactor()
{
  samplingRate = (2 * Math.PI) * (1 - RATE_FACTOR);
  setupSamples();
  phase = -Math.PI / 2;
  travelledPhase = 0;
  currentSampleIndex = 0;
  currentRotationPhase = 0;
  sampling = true;
}