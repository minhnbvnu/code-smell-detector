constructor(name, numComps) {
    if (this.constructor === ColorSpace) {
      (0, _util.unreachable)("Cannot initialize ColorSpace.");
    }

    this.name = name;
    this.numComps = numComps;
  }