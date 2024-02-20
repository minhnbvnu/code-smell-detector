function TimedAnimation(clock, animate) {
      this.clock = clock;
      this.animate = animate;
      TimedAnimation.__super__.constructor.apply(this, arguments);
    }