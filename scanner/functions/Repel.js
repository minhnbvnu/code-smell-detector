function Repel(extents, opts) {
      this.timeToLeaveXY = bind(this.timeToLeaveXY, this);
      this.needsResetXY = bind(this.needsResetXY, this);
      this.distr = bind(this.distr, this);
      this.newDistr = bind(this.newDistr, this);
      this.origDistr = bind(this.origDistr, this);
      this.makeScales = bind(this.makeScales, this);
      var ref;
      Repel.__super__.constructor.call(this, extents, opts);
      this.inverse = (ref = opts != null ? opts.inverse : void 0) != null ? ref : new Attract(extents, {
        λ1: 1 / this.λ1,
        λ2: 1 / this.λ2,
        inverse: this,
        scaleZ: this.invScaleZ
      });
    }