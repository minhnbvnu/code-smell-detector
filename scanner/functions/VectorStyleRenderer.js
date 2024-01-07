constructor(styleOrShaders, helper, enableHitDetection) {
    this.helper_ = helper;

    this.hitDetectionEnabled_ = enableHitDetection;
    let shaders = /** @type {StyleShaders} */ (styleOrShaders);
    const isShaders = 'builder' in styleOrShaders;
    if (!isShaders) {
      const parseResult = parseLiteralStyle(
        /** @type {import('../../style/webgl.js').WebGLStyle} */ (
          styleOrShaders
        ),
      );
      shaders = {
        builder: parseResult.builder,
        attributes: parseResult.attributes,
        uniforms: parseResult.uniforms,
      };
    }

    /**
     * @type {boolean}
     * @private
     */
    this.hasFill_ = !!shaders.builder.getFillVertexShader();
    if (this.hasFill_) {
      this.fillVertexShader_ = shaders.builder.getFillVertexShader();
      this.fillFragmentShader_ = shaders.builder.getFillFragmentShader();
      this.fillProgram_ = this.helper_.getProgram(
        this.fillFragmentShader_,
        this.fillVertexShader_,
      );
    }

    /**
     * @type {boolean}
     * @private
     */
    this.hasStroke_ = !!shaders.builder.getStrokeVertexShader();
    if (this.hasStroke_) {
      this.strokeVertexShader_ = shaders.builder.getStrokeVertexShader();
      this.strokeFragmentShader_ = shaders.builder.getStrokeFragmentShader();
      this.strokeProgram_ = this.helper_.getProgram(
        this.strokeFragmentShader_,
        this.strokeVertexShader_,
      );
    }

    /**
     * @type {boolean}
     * @private
     */
    this.hasSymbol_ = !!shaders.builder.getSymbolVertexShader();
    if (this.hasSymbol_) {
      this.symbolVertexShader_ = shaders.builder.getSymbolVertexShader();
      this.symbolFragmentShader_ = shaders.builder.getSymbolFragmentShader();
      this.symbolProgram_ = this.helper_.getProgram(
        this.symbolFragmentShader_,
        this.symbolVertexShader_,
      );
    }

    const hitDetectionAttributes = this.hitDetectionEnabled_
      ? {
          hitColor: {
            callback() {
              return colorEncodeId(this.ref, tmpColor);
            },
            size: 4,
          },
        }
      : {};

    this.customAttributes_ = Object.assign(
      {},
      hitDetectionAttributes,
      shaders.attributes,
    );
    this.uniforms_ = shaders.uniforms;

    const customAttributesDesc = Object.entries(this.customAttributes_).map(
      ([name, value]) => ({
        name: `a_prop_${name}`,
        size: value.size || 1,
        type: AttributeType.FLOAT,
      }),
    );
    /**
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @private
     */
    this.polygonAttributesDesc_ = [
      {
        name: Attributes.POSITION,
        size: 2,
        type: AttributeType.FLOAT,
      },
      ...customAttributesDesc,
    ];
    /**
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @private
     */
    this.lineStringAttributesDesc_ = [
      {
        name: Attributes.SEGMENT_START,
        size: 2,
        type: AttributeType.FLOAT,
      },
      {
        name: Attributes.SEGMENT_END,
        size: 2,
        type: AttributeType.FLOAT,
      },
      {
        name: Attributes.JOIN_ANGLES,
        size: 2,
        type: AttributeType.FLOAT,
      },
      {
        name: Attributes.DISTANCE,
        size: 1,
        type: AttributeType.FLOAT,
      },
      {
        name: Attributes.PARAMETERS,
        size: 1,
        type: AttributeType.FLOAT,
      },
      ...customAttributesDesc,
    ];
    /**
     * @type {Array<import('../../webgl/Helper.js').AttributeDescription>}
     * @private
     */
    this.pointAttributesDesc_ = [
      {
        name: Attributes.POSITION,
        size: 2,
        type: AttributeType.FLOAT,
      },
      {
        name: Attributes.INDEX,
        size: 1,
        type: AttributeType.FLOAT,
      },
      ...customAttributesDesc,
    ];

    if (shaders.uniforms) {
      this.helper_.addUniforms(shaders.uniforms);
    }
  }