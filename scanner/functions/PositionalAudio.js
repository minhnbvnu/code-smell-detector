function PositionalAudio(listener) {

  Audio.call(this, listener);

  this.panner = this.context.createPanner();
  this.panner.connect(this.gain);

}