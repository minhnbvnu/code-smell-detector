function Processor() {
    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, Processor);
    this.version = '8.4.21';
    this.plugins = this.normalize(plugins);
  }