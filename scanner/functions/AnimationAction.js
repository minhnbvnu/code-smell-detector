function AnimationAction(mixer, clip, localRoot) {

  this._mixer = mixer;
  this._clip = clip;
  this._localRoot = localRoot || null;

  var tracks = clip.tracks,
    nTracks = tracks.length,
    interpolants = new Array(nTracks);

  var interpolantSettings = {
    endingStart: ZeroCurvatureEnding,
    endingEnd: ZeroCurvatureEnding
  };

  for (var i = 0; i !== nTracks; ++i) {

    var interpolant = tracks[i].createInterpolant(null);
    interpolants[i] = interpolant;
    interpolant.settings = interpolantSettings;

  }

  this._interpolantSettings = interpolantSettings;

  this._interpolants = interpolants; // bound by the mixer

  // inside: PropertyMixer (managed by the mixer)
  this._propertyBindings = new Array(nTracks);

  this._cacheIndex = null; // for the memory manager
  this._byClipCacheIndex = null; // for the memory manager

  this._timeScaleInterpolant = null;
  this._weightInterpolant = null;

  this.loop = LoopRepeat;
  this._loopCount = -1;

  // global mixer time when the action is to be started
  // it's set back to 'null' upon start of the action
  this._startTime = null;

  // scaled local time of the action
  // gets clamped or wrapped to 0..clip.duration according to loop
  this.time = 0;

  this.timeScale = 1;
  this._effectiveTimeScale = 1;

  this.weight = 1;
  this._effectiveWeight = 1;

  this.repetitions = Infinity; // no. of repetitions when looping

  this.paused = false; // true -> zero effective time scale
  this.enabled = true; // false -> zero effective weight

  this.clampWhenFinished = false; // keep feeding the last frame?

  this.zeroSlopeAtStart = true; // for smooth interpolation w/o separate
  this.zeroSlopeAtEnd = true; // clips for start, loop and end

}