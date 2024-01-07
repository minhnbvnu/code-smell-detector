constructor(helper, size) {
    /**
     * @private
     * @type {import("./Helper.js").default}
     */
    this.helper_ = helper;
    const gl = helper.getGL();

    /**
     * @private
     * @type {WebGLTexture}
     */
    this.texture_ = gl.createTexture();

    /**
     * @private
     * @type {WebGLFramebuffer}
     */
    this.framebuffer_ = gl.createFramebuffer();

    /**
     * @private
     * @type {WebGLRenderbuffer}
     */
    this.depthbuffer_ = gl.createRenderbuffer();

    /**
     * @type {Array<number>}
     * @private
     */
    this.size_ = size || [1, 1];

    /**
     * @type {Uint8Array}
     * @private
     */
    this.data_ = new Uint8Array(0);

    /**
     * @type {boolean}
     * @private
     */
    this.dataCacheDirty_ = true;

    this.updateSize_();
  }