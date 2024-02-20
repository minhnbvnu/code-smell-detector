function MocapAnimator(mocap) {
    this.mocap = mocap;
    this.renderFrame = bind(this.renderFrame, this);
    MocapAnimator.__super__.constructor.apply(this, arguments);
    this.frameIndex = 0;
    this.frameDelay = this.mocap.frameDelay;
    this.onFrame(this.renderFrame);
  }