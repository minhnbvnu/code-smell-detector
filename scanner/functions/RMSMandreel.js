function RMSMandreel() {
  return Math.round(Math.sqrt(mandreelSumSquaredPauses / mandreelSamples) * 100);
}