function audioOutputEvent(event) {    //Web Audio API callback...
  var index = 0;
  var buffer1 = event.outputBuffer.getChannelData(0);
  var buffer2 = event.outputBuffer.getChannelData(1);
  resampleRefill();
  if (!webAudioMono) {
    //STEREO:
    while (index < samplesPerCallback && resampleBufferStart != resampleBufferEnd) {
      buffer1[index] = resampled[resampleBufferStart++] * XAudioJSVolume;
      buffer2[index++] = resampled[resampleBufferStart++] * XAudioJSVolume;
      if (resampleBufferStart == resampleBufferSize) {
        resampleBufferStart = 0;
      }
    }
  }
  else {
    //MONO:
    while (index < samplesPerCallback && resampleBufferStart != resampleBufferEnd) {
      buffer2[index] = buffer1[index] = resampled[resampleBufferStart++] * XAudioJSVolume;
      ++index;
      if (resampleBufferStart == resampleBufferSize) {
        resampleBufferStart = 0;
      }
    }
  }
  //Pad with silence if we're underrunning:
  while (index < samplesPerCallback) {
    buffer2[index] = buffer1[index] = 0;
    ++index;
  }
}