function Audio(listener) {

  Object3D.call(this);

  this.type = 'Audio';

  this.listener = listener;
  this.context = listener.context;

  this.gain = this.context.createGain();
  this.gain.connect(listener.getInput());

  this.autoplay = false;

  this.buffer = null;
  this.loop = false;
  this.startTime = 0;
  this.offset = 0;
  this.playbackRate = 1;
  this.isPlaying = false;
  this.hasPlaybackControl = true;
  this.sourceType = 'empty';

  this.filters = [];

}