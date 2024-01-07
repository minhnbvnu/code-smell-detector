constructor(options) {
    this.gl_ = options.webGlContext;
    const gl = this.gl_;

    this.scaleRatio_ = options.scaleRatio || 1;

    this.renderTargetTexture_ = gl.createTexture();
    this.renderTargetTextureSize_ = null;

    this.frameBuffer_ = gl.createFramebuffer();
    this.depthBuffer_ = gl.createRenderbuffer();

    // compile the program for the frame buffer
    // TODO: make compilation errors show up
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(
      vertexShader,
      options.vertexShader || DEFAULT_VERTEX_SHADER,
    );
    gl.compileShader(vertexShader);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(
      fragmentShader,
      options.fragmentShader || DEFAULT_FRAGMENT_SHADER,
    );
    gl.compileShader(fragmentShader);
    this.renderTargetProgram_ = gl.createProgram();
    gl.attachShader(this.renderTargetProgram_, vertexShader);
    gl.attachShader(this.renderTargetProgram_, fragmentShader);
    gl.linkProgram(this.renderTargetProgram_);

    // bind the vertices buffer for the frame buffer
    this.renderTargetVerticesBuffer_ = gl.createBuffer();
    const verticesArray = [-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1];
    gl.bindBuffer(gl.ARRAY_BUFFER, this.renderTargetVerticesBuffer_);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(verticesArray),
      gl.STATIC_DRAW,
    );

    this.renderTargetAttribLocation_ = gl.getAttribLocation(
      this.renderTargetProgram_,
      'a_position',
    );
    this.renderTargetUniformLocation_ = gl.getUniformLocation(
      this.renderTargetProgram_,
      'u_screenSize',
    );
    this.renderTargetOpacityLocation_ = gl.getUniformLocation(
      this.renderTargetProgram_,
      'u_opacity',
    );
    this.renderTargetTextureLocation_ = gl.getUniformLocation(
      this.renderTargetProgram_,
      'u_image',
    );

    /**
     * Holds info about custom uniforms used in the post processing pass
     * @type {Array<UniformInternalDescription>}
     * @private
     */
    this.uniforms_ = [];
    options.uniforms &&
      Object.keys(options.uniforms).forEach((name) => {
        this.uniforms_.push({
          value: options.uniforms[name],
          location: gl.getUniformLocation(this.renderTargetProgram_, name),
        });
      });
  }