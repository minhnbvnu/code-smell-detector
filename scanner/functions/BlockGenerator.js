function BlockGenerator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BlockGenerator);

    this.options = options;

    this.blockStack = [];

    this.blockList = [];
    this.depth = 0;
  }