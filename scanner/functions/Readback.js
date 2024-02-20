function Readback(renderer, shaders, options) {
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
    if (this.type == null) {
      this.type = options.type || THREE.FloatType;
    }
    if (this.stpq == null) {
      this.stpq = options.stpq || false;
    }
    this.isFloat = this.type === THREE.FloatType;
    this.active = this.sampled = this.rect = this.pad = null;
    Readback.__super__.constructor.call(this, renderer, shaders);
    this.build(options);

    /*
     * log precision
    gl = @gl
    for name, pass of {Vertex: gl.VERTEX_SHADER, Fragment: gl.FRAGMENT_SHADER}
      bits = for prec in [gl.LOW_FLOAT, gl.MEDIUM_FLOAT, gl.HIGH_FLOAT]
        gl.getShaderPrecisionFormat(pass, prec).precision
      console.log name, 'shader precision',  bits
     */
  }