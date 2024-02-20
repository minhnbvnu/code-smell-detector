function AttractRepelLine() {
      this.makeReference = bind(this.makeReference, this);
      this.distr = bind(this.distr, this);
      this.newDistr = bind(this.newDistr, this);
      this.origDistr = bind(this.origDistr, this);
      this.makeScales = bind(this.makeScales, this);
      return AttractRepelLine.__super__.constructor.apply(this, arguments);
    }