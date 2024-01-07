constructor(cffInfo, cmap, fontMatrix, glyphNameMap) {
      super(fontMatrix || [0.001, 0, 0, 0.001, 0, 0]);
      this.glyphs = cffInfo.glyphs;
      this.gsubrs = cffInfo.gsubrs || [];
      this.subrs = cffInfo.subrs || [];
      this.cmap = cmap;
      this.glyphNameMap = glyphNameMap || (0, _glyphlist.getGlyphsUnicode)();
      this.gsubrsBias = getSubroutineBias(this.gsubrs);
      this.subrsBias = getSubroutineBias(this.subrs);
      this.isCFFCIDFont = cffInfo.isCFFCIDFont;
      this.fdSelect = cffInfo.fdSelect;
      this.fdArray = cffInfo.fdArray;
    }