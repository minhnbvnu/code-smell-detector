function getFloat32Flat(size) {
  try {
    var newBuffer = new Float32Array(size);
  }
  catch (error) {
    var newBuffer = new Array(size);
    var audioSampleIndice = 0;
    do {
      newBuffer[audioSampleIndice] = 0;
    } while (++audioSampleIndice < size);
  }
  return newBuffer;
}