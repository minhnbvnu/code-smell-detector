function CFFFont(file, properties) {
    this.properties = properties;
    var parser = new _cff_parser.CFFParser(file, properties, SEAC_ANALYSIS_ENABLED);
    this.cff = parser.parse();
    this.cff.duplicateFirstGlyph();
    var compiler = new _cff_parser.CFFCompiler(this.cff);
    this.seacs = this.cff.seacs;

    try {
      this.data = compiler.compile();
    } catch (e) {
      (0, _util.warn)("Failed to compile font " + properties.loadedName);
      this.data = file;
    }
  }