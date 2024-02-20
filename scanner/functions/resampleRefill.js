function resampleRefill() {
  if (audioBufferSize > 0) {
    //Resample a chunk of audio:
    var resampleLength = resampleControl.resampler(getBufferSamples());
    var resampledResult = resampleControl.outputBuffer;
    for (var index2 = 0; index2 < resampleLength; ++index2) {
      resampled[resampleBufferEnd++] = resampledResult[index2];
      if (resampleBufferEnd == resampleBufferSize) {
        resampleBufferEnd = 0;
      }
      if (resampleBufferStart == resampleBufferEnd) {
        ++resampleBufferStart;
        if (resampleBufferStart == resampleBufferSize) {
          resampleBufferStart = 0;
        }
      }
    }
    audioBufferSize = 0;
  }
}