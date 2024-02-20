function DataBuffer(renderer, shaders, options) {
    this.width = options.width || 1;
    this.height = options.height || 1;
    this.depth = options.depth || 1;
    if (this.samples == null) {
      this.samples = this.width * this.height * this.depth;
    }
    DataBuffer.__super__.constructor.call(this, renderer, shaders, options);
    this.build(options);
  }