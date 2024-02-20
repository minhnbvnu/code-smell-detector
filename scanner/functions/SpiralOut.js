function SpiralOut(extents, opts) {
      this.timeToLeaveXY = bind(this.timeToLeaveXY, this);
      this.needsResetXY = bind(this.needsResetXY, this);
      this.makeDistributions = bind(this.makeDistributions, this);
      this.randomScale = bind(this.randomScale, this);
      var ref;
      SpiralOut.__super__.constructor.call(this, extents, opts);
      this.direction = 1;
      this.inverse = (ref = opts != null ? opts.inverse : void 0) != null ? ref : new SpiralIn(extents, {
        θ: -this.θ,
        scale: 1 / this.scale,
        inverse: this,
        dist: this.distType,
        scaleZ: this.invScaleZ
      });
    }