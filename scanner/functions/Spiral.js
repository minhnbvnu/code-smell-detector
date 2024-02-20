function Spiral() {
      this.makePath = bind(this.makePath, this);
      this.makeReference = bind(this.makeReference, this);
      return Spiral.__super__.constructor.apply(this, arguments);
    }