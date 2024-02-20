function AudioListener() {

  Object3D.call(this);

  this.type = 'AudioListener';

  this.context = AudioContext.getContext();

  this.gain = this.context.createGain();
  this.gain.connect(this.context.destination);

  this.filter = null;

  this.timeDelta = 0;

}