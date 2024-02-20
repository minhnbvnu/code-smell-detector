function NoWorkResult(processor, css, opts) {
    _classCallCheck(this, NoWorkResult);
    css = css.toString();
    this.stringified = false;
    this._processor = processor;
    this._css = css;
    this._opts = opts;
    this._map = undefined;
    var root;
    var str = stringify;
    this.result = new Result(this._processor, root, this._opts);
    this.result.css = css;
    var self = this;
    Object.defineProperty(this.result, 'root', {
      get: function get() {
        return self.root;
      }
    });
    var map = new MapGenerator(str, root, this._opts, css);
    if (map.isMap()) {
      var _map$generate = map.generate(),
        _map$generate2 = _slicedToArray(_map$generate, 2),
        generatedCSS = _map$generate2[0],
        generatedMap = _map$generate2[1];
      if (generatedCSS) {
        this.result.css = generatedCSS;
      }
      if (generatedMap) {
        this.result.map = generatedMap;
      }
    }
  }