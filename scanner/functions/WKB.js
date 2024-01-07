constructor(options) {
    super();

    options = options ? options : {};

    this.splitCollection = Boolean(options.splitCollection);

    this.viewCache_ = null;

    this.hex_ = options.hex !== false;
    this.littleEndian_ = options.littleEndian !== false;
    this.ewkb_ = options.ewkb !== false;

    this.layout_ = options.geometryLayout; // null for auto detect
    this.nodataZ_ = options.nodataZ || 0;
    this.nodataM_ = options.nodataM || 0;

    this.srid_ = options.srid;
  }