function AttractRepel() {
      this.makeReference = bind(this.makeReference, this);
      this.makeScales = bind(this.makeScales, this);
      return AttractRepel.__super__.constructor.apply(this, arguments);
    }