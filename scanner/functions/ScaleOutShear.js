function ScaleOutShear(extents1, opts) {
      var ref, ref1;
      this.extents = extents1;
      this.timeToLeaveXY = bind(this.timeToLeaveXY, this);
      this.needsResetXY = bind(this.needsResetXY, this);
      if (opts == null) {
        opts = {};
      }
      this.scale = (ref = opts.scale) != null ? ref : linLerp(1 / 0.7, 1 / 0.3)(Math.random());
      this.lerpY = expLerp(0.01 / this.scale, this.extents.y);
      this.lerpYNew = expLerp(0.01 / this.scale, 0.01);
      ScaleOutShear.__super__.constructor.call(this, this.extents, opts);
      this.inverse = (ref1 = opts != null ? opts.inverse : void 0) != null ? ref1 : new ScaleInShear(this.extents, {
        translate: -this.translate,
        scale: 1 / this.scale,
        inverse: this,
        scaleZ: this.invScaleZ
      });
    }