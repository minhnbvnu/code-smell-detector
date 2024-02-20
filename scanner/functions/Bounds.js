function Bounds() {
    this.maxZ = bind(this.maxZ, this);
    this.maxY = bind(this.maxY, this);
    this.maxX = bind(this.maxX, this);
    this.minZ = bind(this.minZ, this);
    this.minY = bind(this.minY, this);
    this.minX = bind(this.minX, this);
    this.depth = bind(this.depth, this);
    this.height = bind(this.height, this);
    this.width = bind(this.width, this);
    this.min = null;
    this.max = null;
  }