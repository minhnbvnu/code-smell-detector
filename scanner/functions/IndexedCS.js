constructor(base, highVal, lookup) {
    super("Indexed", 1);
    this.base = base;
    this.highVal = highVal;
    const length = base.numComps * highVal;
    this.lookup = new Uint8Array(length);

    if ((0, _primitives.isStream)(lookup)) {
      const bytes = lookup.getBytes(length);
      this.lookup.set(bytes);
    } else if (typeof lookup === "string") {
      for (let i = 0; i < length; ++i) {
        this.lookup[i] = lookup.charCodeAt(i) & 0xff;
      }
    } else {
      throw new _util.FormatError(`IndexedCS - unrecognized lookup table: ${lookup}`);
    }
  }