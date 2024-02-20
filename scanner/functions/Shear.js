function Shear(extents, opts) {
      this.makePath = bind(this.makePath, this);
      this.timeToLeaveXY = bind(this.timeToLeaveXY, this);
      this.needsResetXY = bind(this.needsResetXY, this);
      this.makeReference = bind(this.makeReference, this);
      this.shaderParams = bind(this.shaderParams, this);
      this.newDistr = bind(this.newDistr, this);
      this.origDistr = bind(this.origDistr, this);
      var ref, ref1;
      Shear.__super__.constructor.call(this, extents, opts);
      if (opts == null) {
        opts = {};
      }
      this.translate = (ref = opts.translate) != null ? ref : randSign() * linLerp(0.2, 2.0)(Math.random());
      this.makeStepMat(1, this.translate, 0, 1);
      this.lerpY = linLerp(0.01, this.extents.y);
      this.lerpY2 = linLerp(-this.extents.y, this.extents.y);
      this.inverse = (ref1 = opts != null ? opts.inverse : void 0) != null ? ref1 : new Shear(extents, {
        translate: -this.translate,
        inverse: this,
        scaleZ: this.invScaleZ
      });
    }