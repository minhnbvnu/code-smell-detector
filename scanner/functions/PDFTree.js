constructor(options = {}) {
    this._items = {};
    // disable /Limits output for this tree
    this.limits =
      typeof options.limits === 'boolean' ? options.limits : true;
  }