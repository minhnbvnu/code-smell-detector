constructor(name, data) {
    this.name = name;
    this.data = data;

    /**
     * @type {WebGLTexture|null}
     * @private
     */
    this.texture_ = null;
  }