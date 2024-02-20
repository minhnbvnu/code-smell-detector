function MapGenerator(stringify, root, opts, cssString) {
    _classCallCheck(this, MapGenerator);
    this.stringify = stringify;
    this.mapOpts = opts.map || {};
    this.root = root;
    this.opts = opts;
    this.css = cssString;
    this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
  }