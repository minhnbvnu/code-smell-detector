function createDCOffset() {
    var ac = p5sound.audiocontext;
    var buffer = ac.createBuffer(1, 2048, ac.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < 2048; i++)
      data[i] = 1;
    var bufferSource = ac.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.loop = true;
    return bufferSource;
  }