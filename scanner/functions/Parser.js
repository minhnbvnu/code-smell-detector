constructor(lexer) {
    /**
     * @type {Lexer}
     * @private
     */
    this.lexer_ = lexer;

    /**
     * @type {Token}
     * @private
     */
    this.token_ = {
      position: 0,
      type: TokenType.START,
    };

    /**
     * @type {import("../geom/Geometry.js").GeometryLayout}
     * @private
     */
    this.layout_ = 'XY';
  }