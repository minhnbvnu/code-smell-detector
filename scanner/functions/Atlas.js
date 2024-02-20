function Atlas(renderer, shaders, options) {
    if (this.width == null) {
      this.width = options.width || 512;
    }
    if (this.height == null) {
      this.height = options.height || 512;
    }
    if (this.channels == null) {
      this.channels = options.channels || 4;
    }
    if (this.backed == null) {
      this.backed = options.backed || false;
    }
    this.samples = this.width * this.height;
    Atlas.__super__.constructor.call(this, renderer, shaders);
    this.build(options);
  }