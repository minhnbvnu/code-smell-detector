function PreviousMap(css, opts) {
    _classCallCheck(this, PreviousMap);
    if (opts.map === false) return;
    this.loadAnnotation(css);
    this.inline = this.startWith(this.annotation, 'data:');
    var prev = opts.map ? opts.map.prev : undefined;
    var text = this.loadMap(opts.from, prev);
    if (!this.mapFile && opts.from) {
      this.mapFile = opts.from;
    }
    if (this.mapFile) this.root = dirname(this.mapFile);
    if (text) this.text = text;
  }