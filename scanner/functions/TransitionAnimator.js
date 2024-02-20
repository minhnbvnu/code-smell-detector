function TransitionAnimator() {
    this.update = bind(this.update, this);
    TransitionAnimator.__super__.constructor.apply(this, arguments);
    this.queue = [];
    this.transitions = [];
    this.onFrame(this.update);
  }