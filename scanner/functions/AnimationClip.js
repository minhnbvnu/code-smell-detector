function AnimationClip(name, duration, tracks) {

  this.name = name;
  this.tracks = tracks;
  this.duration = (duration !== undefined) ? duration : -1;

  this.uuid = _Math.generateUUID();

  // this means it should figure out its duration by scanning the tracks
  if (this.duration < 0) {

    this.resetDuration();

  }

}