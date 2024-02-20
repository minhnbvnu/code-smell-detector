function Complex(extents, opts) {
      this.shaderParams = bind(this.shaderParams, this);
      this.distr = bind(this.distr, this);
      this.newDistr = bind(this.newDistr, this);
      this.origDistr = bind(this.origDistr, this);
      var ref, ref1;
      Complex.__super__.constructor.call(this, extents, opts);
      if (opts == null) {
        opts = {};
      }
      this.θ = (ref = opts.θ) != null ? ref : randSign() * linLerp(π / 6, 5 * π / 6)(Math.random());
      this.scale = (ref1 = opts.scale) != null ? ref1 : this.randomScale();
      this.logScale = Math.log(this.scale);
      this.makeStepMat(Math.cos(this.θ) * this.scale, -Math.sin(this.θ) * this.scale, Math.sin(this.θ) * this.scale, Math.cos(this.θ) * this.scale);
      this.makeDistributions(opts);
    }