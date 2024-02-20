function getBufferSamples() {
  //Typed array and normal array buffer section referencing:
  try {
    return audioContextSampleBuffer.subarray(0, audioBufferSize);
  }
  catch (error) {
    try {
      //Regular array pass:
      audioContextSampleBuffer.length = audioBufferSize;
      return audioContextSampleBuffer;
    }
    catch (error) {
      //Nightly Firefox 4 used to have the subarray function named as slice:
      return audioContextSampleBuffer.slice(0, audioBufferSize);
    }
  }
}