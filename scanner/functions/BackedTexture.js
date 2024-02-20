function BackedTexture(gl, width, height, channels, options) {
    BackedTexture.__super__.constructor.call(this, gl, width, height, channels, options);
    this.data = new this.ctor(this.n);
  }