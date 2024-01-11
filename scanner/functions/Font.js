function Font(name, file, properties) {
    var charCode;
    this.name = name;
    this.loadedName = properties.loadedName;
    this.isType3Font = properties.isType3Font;
    this.missingFile = false;
    this.glyphCache = Object.create(null);
    this.isSerifFont = !!(properties.flags & FontFlags.Serif);
    this.isSymbolicFont = !!(properties.flags & FontFlags.Symbolic);
    this.isMonospace = !!(properties.flags & FontFlags.FixedPitch);
    var type = properties.type;
    var subtype = properties.subtype;
    this.type = type;
    this.subtype = subtype;
    let fallbackName = "sans-serif";

    if (this.isMonospace) {
      fallbackName = "monospace";
    } else if (this.isSerifFont) {
      fallbackName = "serif";
    }

    this.fallbackName = fallbackName;
    this.differences = properties.differences;
    this.widths = properties.widths;
    this.defaultWidth = properties.defaultWidth;
    this.composite = properties.composite;
    this.cMap = properties.cMap;
    this.capHeight = properties.capHeight / PDF_GLYPH_SPACE_UNITS;
    this.ascent = properties.ascent / PDF_GLYPH_SPACE_UNITS;
    this.descent = properties.descent / PDF_GLYPH_SPACE_UNITS;
    this.fontMatrix = properties.fontMatrix;
    this.bbox = properties.bbox;
    this.defaultEncoding = properties.defaultEncoding;
    this.toUnicode = properties.toUnicode;
    this.fallbackToUnicode = properties.fallbackToUnicode || new ToUnicodeMap();
    this.toFontChar = [];

    if (properties.type === "Type3") {
      for (charCode = 0; charCode < 256; charCode++) {
        this.toFontChar[charCode] = this.differences[charCode] || properties.defaultEncoding[charCode];
      }

      this.fontType = _util.FontType.TYPE3;
      return;
    }

    this.cidEncoding = properties.cidEncoding;
    this.vertical = !!properties.vertical;

    if (this.vertical) {
      this.vmetrics = properties.vmetrics;
      this.defaultVMetrics = properties.defaultVMetrics;
    }

    if (!file || file.isEmpty) {
      if (file) {
        (0, _util.warn)('Font file is empty in "' + name + '" (' + this.loadedName + ")");
      }

      this.fallbackToSystemFont(properties);
      return;
    }

    [type, subtype] = getFontFileType(file, properties);

    if (type !== this.type || subtype !== this.subtype) {
      (0, _util.info)("Inconsistent font file Type/SubType, expected: " + `${this.type}/${this.subtype} but found: ${type}/${subtype}.`);
    }

    try {
      var data;

      switch (type) {
        case "MMType1":
          (0, _util.info)("MMType1 font (" + name + "), falling back to Type1.");

        case "Type1":
        case "CIDFontType0":
          this.mimetype = "font/opentype";
          var cff = subtype === "Type1C" || subtype === "CIDFontType0C" ? new CFFFont(file, properties) : new Type1Font(name, file, properties);
          adjustWidths(properties);
          data = this.convert(name, cff, properties);
          break;

        case "OpenType":
        case "TrueType":
        case "CIDFontType2":
          this.mimetype = "font/opentype";
          data = this.checkAndRepair(name, file, properties);

          if (this.isOpenType) {
            adjustWidths(properties);
            type = "OpenType";
          }

          break;

        default:
          throw new _util.FormatError(`Font ${type} is not supported`);
      }
    } catch (e) {
      (0, _util.warn)(e);
      this.fallbackToSystemFont(properties);
      return;
    }

    this.data = data;
    this.fontType = getFontType(type, subtype);
    this.fontMatrix = properties.fontMatrix;
    this.widths = properties.widths;
    this.defaultWidth = properties.defaultWidth;
    this.toUnicode = properties.toUnicode;
    this.seacMap = properties.seacMap;
  }