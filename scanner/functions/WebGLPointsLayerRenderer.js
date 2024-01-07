constructor(layer, options) {
    const uniforms = options.uniforms || {};
    const projectionMatrixTransform = createTransform();
    uniforms[DefaultUniform.PROJECTION_MATRIX] = projectionMatrixTransform;

    super(layer, {
      uniforms: uniforms,
      postProcesses: options.postProcesses,
    });

    this.sourceRevision_ = -1;

    this.verticesBuffer_ = new WebGLArrayBuffer(ARRAY_BUFFER, DYNAMIC_DRAW);
    this.indicesBuffer_ = new WebGLArrayBuffer(
      ELEMENT_ARRAY_BUFFER,
      DYNAMIC_DRAW,
    );

    /**
     * @private
     */
    this.vertexShader_ = options.vertexShader;

    /**
     * @private
     */
    this.fragmentShader_ = options.fragmentShader;

    /**
     * @type {WebGLProgram}
     * @private
     */
    this.program_;

    /**
     * @type {boolean}
     * @private
     */
    this.hitDetectionEnabled_ = options.hitDetectionEnabled ?? true;

    const customAttributes = options.attributes
      ? options.attributes.map(function (attribute) {
          return {
            name: 'a_prop_' + attribute.name,
            size: 1,
            type: AttributeType.FLOAT,
          };
        })
      : [];

    /**
     * A list of attributes used by the renderer. By default only the position and
     * index of the vertex (0 to 3) are required.
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     */
    this.attributes = [
      {
        name: 'a_position',
        size: 2,
        type: AttributeType.FLOAT,
      },
      {
        name: 'a_index',
        size: 1,
        type: AttributeType.FLOAT,
      },
    ];

    if (this.hitDetectionEnabled_) {
      this.attributes.push({
        name: 'a_prop_hitColor',
        size: 4,
        type: AttributeType.FLOAT,
      });
      this.attributes.push({
        name: 'a_featureUid',
        size: 1,
        type: AttributeType.FLOAT,
      });
    }
    this.attributes.push(...customAttributes);

    this.customAttributes = options.attributes ? options.attributes : [];

    this.previousExtent_ = createEmpty();

    /**
     * This transform is updated on every frame and is the composition of:
     * - invert of the world->screen transform that was used when rebuilding buffers (see `this.renderTransform_`)
     * - current world->screen transform
     * @type {import("../../transform.js").Transform}
     * @private
     */
    this.currentTransform_ = projectionMatrixTransform;

    /**
     * This transform is updated when buffers are rebuilt and converts world space coordinates to screen space
     * @type {import("../../transform.js").Transform}
     * @private
     */
    this.renderTransform_ = createTransform();

    /**
     * @type {import("../../transform.js").Transform}
     * @private
     */
    this.invertRenderTransform_ = createTransform();

    /**
     * @type {Float32Array}
     * @private
     */
    this.renderInstructions_ = new Float32Array(0);

    /**
     * @type {WebGLRenderTarget}
     * @private
     */
    this.hitRenderTarget_;

    /**
     * Keep track of latest message sent to worker
     * @type {number}
     * @private
     */
    this.lastSentId = 0;

    /**
     * @private
     */
    this.worker_ = createWebGLWorker();

    this.worker_.addEventListener(
      'message',
      /**
       * @param {*} event Event.
       */
      (event) => {
        const received = event.data;
        if (received.type === WebGLWorkerMessageType.GENERATE_POINT_BUFFERS) {
          const projectionTransform = received.projectionTransform;
          this.verticesBuffer_.fromArrayBuffer(received.vertexBuffer);
          this.helper.flushBufferData(this.verticesBuffer_);
          this.indicesBuffer_.fromArrayBuffer(received.indexBuffer);
          this.helper.flushBufferData(this.indicesBuffer_);

          this.renderTransform_ = projectionTransform;
          makeInverseTransform(
            this.invertRenderTransform_,
            this.renderTransform_,
          );
          this.renderInstructions_ = new Float32Array(
            event.data.renderInstructions,
          );
          if (received.id === this.lastSentId) {
            this.ready = true;
          }
          this.getLayer().changed();
        }
      },
    );

    /**
     * This object will be updated when the source changes. Key is uid.
     * @type {Object<string, FeatureCacheItem>}
     * @private
     */
    this.featureCache_ = {};

    /**
     * Amount of features in the cache.
     * @type {number}
     * @private
     */
    this.featureCount_ = 0;

    const source = this.getLayer().getSource();
    this.sourceListenKeys_ = [
      listen(
        source,
        VectorEventType.ADDFEATURE,
        this.handleSourceFeatureAdded_,
        this,
      ),
      listen(
        source,
        VectorEventType.CHANGEFEATURE,
        this.handleSourceFeatureChanged_,
        this,
      ),
      listen(
        source,
        VectorEventType.REMOVEFEATURE,
        this.handleSourceFeatureDelete_,
        this,
      ),
      listen(
        source,
        VectorEventType.CLEAR,
        this.handleSourceFeatureClear_,
        this,
      ),
    ];
    source.forEachFeature((feature) => {
      this.featureCache_[getUid(feature)] = {
        feature: feature,
        properties: feature.getProperties(),
        geometry: feature.getGeometry(),
      };
      this.featureCount_++;
    });
  }