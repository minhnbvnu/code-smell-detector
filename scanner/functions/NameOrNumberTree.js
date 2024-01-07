constructor(root, xref, type) {
    if (this.constructor === NameOrNumberTree) {
      (0, _util.unreachable)("Cannot initialize NameOrNumberTree.");
    }

    this.root = root;
    this.xref = xref;
    this._type = type;
  }