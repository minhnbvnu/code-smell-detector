function SplayRMS() {
  return Math.round(Math.sqrt(splaySumOfSquaredPauses / splaySamples) * 10000);
}