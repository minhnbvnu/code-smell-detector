function GameBoyAudioContext () {
  this.createBufferSource = function() {
    return { noteOn : function () {}, connect : function() {}};
  }
  this.sampleRate = 48000;
  this.destination = {}
  this.createBuffer = function (channels, len, sampleRate) {
    return { gain : 1,
             numberOfChannels : 1,
             length : 1,
             duration : 0.000020833333110203966,
             sampleRate : 48000}
  }
  this.createJavaScriptNode = function (bufferSize, inputChannels, outputChannels) {
    GameBoyAudioNode.bufferSize = bufferSize;
    GameBoyAudioNode.outputBuffer = {
        getChannelData : function (i) {return this.channelData[i];},
        channelData    : []
    };
    for (var i = 0; i < outputChannels; i++) {
      GameBoyAudioNode.outputBuffer.channelData[i] = new Float32Array(bufferSize);
    }
    return GameBoyAudioNode;
  }
}