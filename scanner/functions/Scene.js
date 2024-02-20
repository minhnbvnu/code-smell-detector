function Scene(options) {
    this.flushCache = bind(this.flushCache, this);
    this.render = bind(this.render, this);
    seen.Util.defaults(this, options, this.defaults());
    this._renderModelCache = {};
  }