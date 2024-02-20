function MatrixBuffer(renderer, shaders, options) {
    this.width = options.width || 1;
    this.height = options.height || 1;
    this.history = options.history || 1;
    this.samples = this.width * this.height;
    this.wrap = this.history > 1;
    options.depth = this.history;
    MatrixBuffer.__super__.constructor.call(this, renderer, shaders, options);
  }