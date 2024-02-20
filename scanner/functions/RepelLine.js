function RepelLine(extents, opts) {
      this.timeToLeaveXY = bind(this.timeToLeaveXY, this);
      this.needsResetXY = bind(this.needsResetXY, this);
      this.makeScales = bind(this.makeScales, this);
      var ref;
      RepelLine.__super__.constructor.call(this, extents, opts);
      this.inverse = (ref = opts != null ? opts.inverse : void 0) != null ? ref : new AttractLine(extents, {
        λ1: 1 / this.λ1,
        λ2: 1 / this.λ2,
        inverse: this,
        scaleZ: this.invScaleZ
      });
    }