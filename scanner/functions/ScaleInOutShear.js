function ScaleInOutShear(extents, opts) {
      this.makePath = bind(this.makePath, this);
      this.makeReference = bind(this.makeReference, this);
      this.shaderParams = bind(this.shaderParams, this);
      this.distr = bind(this.distr, this);
      this.newDistr = bind(this.newDistr, this);
      this.origDistr = bind(this.origDistr, this);
      var a, ref, λ;
      ScaleInOutShear.__super__.constructor.call(this, extents, opts);
      if (opts == null) {
        opts = {};
      }
      this.translate = (ref = opts.translate) != null ? ref : randSign() * linLerp(0.2, 2.0)(Math.random());
      λ = this.scale;
      a = this.translate;
      this.makeStepMat(λ, λ * a, 0, λ);
      this.logScale = Math.log(λ);
      this.xOfY = function(r, y) {
        return y * (r + a * Math.log(y) / this.logScale);
      };
      this.lerpR = function(t) {
        return Math.tan((t - 0.5) * π);
      };
      this.lerpR2 = function(t) {
        return Math.tan((t / 0.99 + 0.005 - 0.5) * π);
      };
    }