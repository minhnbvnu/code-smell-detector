constructor() {
    /**
     * Uniforms; these will be declared in the header (should include the type).
     * @type {Array<string>}
     * @private
     */
    this.uniforms_ = [];

    /**
     * Attributes; these will be declared in the header (should include the type).
     * @type {Array<string>}
     * @private
     */
    this.attributes_ = [];

    /**
     * Varyings with a name, a type and an expression.
     * @type {Array<VaryingDescription>}
     * @private
     */
    this.varyings_ = [];

    /**
     * @type {boolean}
     * @private
     */
    this.hasSymbol_ = false;

    /**
     * @type {string}
     * @private
     */
    this.symbolSizeExpression_ = `vec2(${numberToGlsl(
      DEFAULT_STYLE['circle-radius'],
    )} + ${numberToGlsl(DEFAULT_STYLE['circle-stroke-width'] * 0.5)})`;

    /**
     * @type {string}
     * @private
     */
    this.symbolRotationExpression_ = '0.0';

    /**
     * @type {string}
     * @private
     */
    this.symbolOffsetExpression_ = 'vec2(0.0)';

    /**
     * @type {string}
     * @private
     */
    this.symbolColorExpression_ = colorToGlsl(
      /** @type {string} */ (DEFAULT_STYLE['circle-fill-color']),
    );

    /**
     * @type {string}
     * @private
     */
    this.texCoordExpression_ = 'vec4(0.0, 0.0, 1.0, 1.0)';

    /**
     * @type {string}
     * @private
     */
    this.discardExpression_ = 'false';

    /**
     * @type {boolean}
     * @private
     */
    this.symbolRotateWithView_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.hasStroke_ = false;

    /**
     * @type {string}
     * @private
     */
    this.strokeWidthExpression_ = numberToGlsl(DEFAULT_STYLE['stroke-width']);

    /**
     * @type {string}
     * @private
     */
    this.strokeColorExpression_ = colorToGlsl(
      /** @type {string} */ (DEFAULT_STYLE['stroke-color']),
    );

    /**
     * @private
     */
    this.strokeOffsetExpression_ = '0.';

    /**
     * @private
     */
    this.strokeCapExpression_ = stringToGlsl('round');

    /**
     * @private
     */
    this.strokeJoinExpression_ = stringToGlsl('round');

    /**
     * @private
     */
    this.strokeMiterLimitExpression_ = '10.';

    /**
     * @private
     */
    this.strokeDistanceFieldExpression_ = '-1000.';

    /**
     * @type {boolean}
     * @private
     */
    this.hasFill_ = false;

    /**
     * @type {string}
     * @private
     */
    this.fillColorExpression_ = colorToGlsl(
      /** @type {string} */ (DEFAULT_STYLE['fill-color']),
    );

    /**
     * @type {Array<string>}
     * @private
     */
    this.vertexShaderFunctions_ = [];

    /**
     * @type {Array<string>}
     * @private
     */
    this.fragmentShaderFunctions_ = [];
  }