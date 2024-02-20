function XAudioServer(channels, sampleRate, minBufferSize, maxBufferSize, underRunCallback, volume) {
  this.audioChannels = (channels == 2) ? 2 : 1;
  webAudioMono = (this.audioChannels == 1);
  XAudioJSSampleRate = (sampleRate > 0 && sampleRate <= 0xFFFFFF) ? sampleRate : 44100;
  webAudioMinBufferSize = (minBufferSize >= (samplesPerCallback << 1) && minBufferSize < maxBufferSize) ? (minBufferSize & ((webAudioMono) ? 0xFFFFFFFF : 0xFFFFFFFE)) : (samplesPerCallback << 1);
  webAudioMaxBufferSize = (Math.floor(maxBufferSize) > webAudioMinBufferSize + this.audioChannels) ? (maxBufferSize & ((webAudioMono) ? 0xFFFFFFFF : 0xFFFFFFFE)) : (minBufferSize << 1);
  this.underRunCallback = (typeof underRunCallback == "function") ? underRunCallback : function () {};
  XAudioJSVolume = (volume >= 0 && volume <= 1) ? volume : 1;
  this.audioType = -1;
  this.mozAudioTail = [];
  this.audioHandleMoz = null;
  this.audioHandleFlash = null;
  this.flashInitialized = false;
  this.mozAudioFound = false;
  this.initializeAudio();
}