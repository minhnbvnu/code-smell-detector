constructor(ids) {
    super(-1, "root", Object.create(null));
    this.element = null;
    this[_ids] = ids;
  }