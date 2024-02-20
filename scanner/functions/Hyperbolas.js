function Hyperbolas(extents, opts) {
      this.timeToLeaveXY = bind(this.timeToLeaveXY, this);
      this.needsResetXY = bind(this.needsResetXY, this);
      this.makeReference = bind(this.makeReference, this);
      this.distr = bind(this.distr, this);
      this.newDistr = bind(this.newDistr, this);
      this.origDistr = bind(this.origDistr, this);
      this.makeScales = bind(this.makeScales, this);
      var ref, ref1, λ1, λ2;
      Hyperbolas.__super__.constructor.call(this, extents, opts);
      ref = this.swapped ? [this.λ2, this.λ1] : [this.λ1, this.λ2], λ1 = ref[0], λ2 = ref[1];
      this.inverse = (ref1 = opts != null ? opts.inverse : void 0) != null ? ref1 : new Hyperbolas(extents, {
        λ1: 1 / λ1,
        λ2: 1 / λ2,
        inverse: this,
        scaleZ: this.invScaleZ
      });
    }