function Animator() {
    this.frame = bind(this.frame, this);
    this.dispatch = seen.Events.dispatch('beforeFrame', 'afterFrame', 'frame');
    this.on = this.dispatch.on;
    this.timestamp = 0;
    this._running = false;
    this.frameDelay = null;
  }