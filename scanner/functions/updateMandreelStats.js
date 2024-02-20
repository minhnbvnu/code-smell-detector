function updateMandreelStats(time) {
  var pause = time - mandreelSampleTimeStart;
  mandreelSampleTimeStart = time;
  mandreelSumSquaredPauses += (pause * pause);
  mandreelSamples++;
}