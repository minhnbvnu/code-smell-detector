constructor(options) {
    super();
    options = options || {};

    /** @private */
    this.boundHandleWebGLContextLost_ = this.handleWebGLContextLost.bind(this);

    /** @private */
    this.boundHandleWebGLContextRestored_ =
      this.handleWebGLContextRestored.bind(this);

    /**
     * @private
     * @type {string}
     */
    this.canvasCacheKey_ = options.canvasCacheKey
      ? getSharedCanvasCacheKey(options.canvasCacheKey)
      : getUniqueCanvasCacheKey();

    /**
     * @private
     * @type {WebGLRenderingContext}
     */
    this.gl_ = getOrCreateContext(this.canvasCacheKey_);

    /**
     * @private
     * @type {!Object<string, BufferCacheEntry>}
     */
    this.bufferCache_ = {};

    /**
     * @private
     * @type {Object<string, Object>}
     */
    this.extensionCache_ = {};

    /**
     * @private
     * @type {WebGLProgram}
     */
    this.currentProgram_ = null;

    /**
     * @private
     * @type boolean
     */
    this.needsToBeRecreated_ = false;

    const canvas = this.gl_.canvas;

    canvas.addEventListener(
      ContextEventType.LOST,
      this.boundHandleWebGLContextLost_,
    );
    canvas.addEventListener(
      ContextEventType.RESTORED,
      this.boundHandleWebGLContextRestored_,
    );

    /**
     * @private
     * @type {import("../transform.js").Transform}
     */
    this.offsetRotateMatrix_ = createTransform();

    /**
     * @private
     * @type {import("../transform.js").Transform}
     */
    this.offsetScaleMatrix_ = createTransform();

    /**
     * @private
     * @type {Array<number>}
     */
    this.tmpMat4_ = create();

    /**
     * @private
     * @type {Object<string, Object<string, WebGLUniformLocation>>}
     */
    this.uniformLocationsByProgram_ = {};

    /**
     * @private
     * @type {Object<string, Object<string, number>>}
     */
    this.attribLocationsByProgram_ = {};

    /**
     * Holds info about custom uniforms used in the post processing pass.
     * If the uniform is a texture, the WebGL Texture object will be stored here.
     * @type {Array<UniformInternalDescription>}
     * @private
     */
    this.uniforms_ = [];
    if (options.uniforms) {
      this.setUniforms(options.uniforms);
    }

    /**
     * An array of PostProcessingPass objects is kept in this variable, built from the steps provided in the
     * options. If no post process was given, a default one is used (so as not to have to make an exception to
     * the frame buffer logic).
     * @type {Array<WebGLPostProcessingPass>}
     * @private
     */
    this.postProcessPasses_ = options.postProcesses
      ? options.postProcesses.map(
          (options) =>
            new WebGLPostProcessingPass({
              webGlContext: this.gl_,
              scaleRatio: options.scaleRatio,
              vertexShader: options.vertexShader,
              fragmentShader: options.fragmentShader,
              uniforms: options.uniforms,
            }),
        )
      : [new WebGLPostProcessingPass({webGlContext: this.gl_})];

    /**
     * @type {string|null}
     * @private
     */
    this.shaderCompileErrors_ = null;

    /**
     * @type {number}
     * @private
     */
    this.startTime_ = Date.now();
  }