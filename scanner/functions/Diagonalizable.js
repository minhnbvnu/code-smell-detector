function Diagonalizable(extents, opts) {
      this.makePath = bind(this.makePath, this);
      this.shaderParams = bind(this.shaderParams, this);
      this.swap = bind(this.swap, this);
      var λ1, λ2;
      Diagonalizable.__super__.constructor.call(this, extents, opts);
      if (opts == null) {
        opts = {};
      }
      this.swapped = false;
      this.makeScales(opts);
      λ1 = this.λ1;
      if (opts.negate1) {
        λ1 *= -1;
      }
      λ2 = this.λ2;
      if (opts.negate2) {
        λ2 *= -1;
      }
      if (this.swapped) {
        this.makeStepMat(λ2, 0, 0, λ1);
      } else {
        this.makeStepMat(λ1, 0, 0, λ2);
      }
    }