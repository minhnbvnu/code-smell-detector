function ArrayBuffer_(renderer, shaders, options) {
    this.width = options.width || 1;
    this.history = options.history || 1;
    this.samples = this.width;
    this.wrap = this.history > 1;
    options.width = this.width;
    options.height = this.history;
    options.depth = 1;
    ArrayBuffer_.__super__.constructor.call(this, renderer, shaders, options);
  }