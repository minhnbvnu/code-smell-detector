function Memo(renderer, shaders, options) {
    if (this.items == null) {
      this.items = options.items || 1;
    }
    if (this.channels == null) {
      this.channels = options.channels || 4;
    }
    if (this.width == null) {
      this.width = options.width || 1;
    }
    if (this.height == null) {
      this.height = options.height || 1;
    }
    if (this.depth == null) {
      this.depth = options.depth || 1;
    }
    options.format = THREE.RGBAFormat;
    options.width = this._width = this.items * this.width;
    options.height = this._height = this.height * this.depth;
    options.frames = 1;
    delete options.items;
    delete options.depth;
    delete options.channels;
    Memo.__super__.constructor.call(this, renderer, shaders, options);
    this._adopt({
      textureItems: {
        type: 'f',
        value: this.items
      },
      textureHeight: {
        type: 'f',
        value: this.height
      }
    });
  }