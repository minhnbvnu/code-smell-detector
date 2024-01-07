constructor(parent = null) {
    this._set = new Set(parent && parent._set);
  }