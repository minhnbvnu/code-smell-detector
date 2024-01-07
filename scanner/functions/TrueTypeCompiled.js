constructor(glyphs, cmap, fontMatrix) {
      super(fontMatrix || [0.000488, 0, 0, 0.000488, 0, 0]);
      this.glyphs = glyphs;
      this.cmap = cmap;
    }