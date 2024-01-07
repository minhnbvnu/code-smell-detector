constructor(options) {
    if (this.constructor === BaseLocalCache) {
      (0, _util.unreachable)("Cannot initialize BaseLocalCache.");
    }

    if (!options || !options.onlyRefs) {
      this._nameRefMap = new Map();
      this._imageMap = new Map();
    }

    this._imageCache = new _primitives.RefSetCache();
  }