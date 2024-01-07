function createOS2Table(properties, charstrings, override) {
    override = override || {
      unitsPerEm: 0,
      yMax: 0,
      yMin: 0,
      ascent: 0,
      descent: 0
    };
    var ulUnicodeRange1 = 0;
    var ulUnicodeRange2 = 0;
    var ulUnicodeRange3 = 0;
    var ulUnicodeRange4 = 0;
    var firstCharIndex = null;
    var lastCharIndex = 0;

    if (charstrings) {
      for (var code in charstrings) {
        code |= 0;

        if (firstCharIndex > code || !firstCharIndex) {
          firstCharIndex = code;
        }

        if (lastCharIndex < code) {
          lastCharIndex = code;
        }

        var position = (0, _unicode.getUnicodeRangeFor)(code);

        if (position < 32) {
          ulUnicodeRange1 |= 1 << position;
        } else if (position < 64) {
          ulUnicodeRange2 |= 1 << position - 32;
        } else if (position < 96) {
          ulUnicodeRange3 |= 1 << position - 64;
        } else if (position < 123) {
          ulUnicodeRange4 |= 1 << position - 96;
        } else {
          throw new _util.FormatError("Unicode ranges Bits > 123 are reserved for internal usage");
        }
      }

      if (lastCharIndex > 0xffff) {
        lastCharIndex = 0xffff;
      }
    } else {
      firstCharIndex = 0;
      lastCharIndex = 255;
    }

    var bbox = properties.bbox || [0, 0, 0, 0];
    var unitsPerEm = override.unitsPerEm || 1 / (properties.fontMatrix || _util.FONT_IDENTITY_MATRIX)[0];
    var scale = properties.ascentScaled ? 1.0 : unitsPerEm / PDF_GLYPH_SPACE_UNITS;
    var typoAscent = override.ascent || Math.round(scale * (properties.ascent || bbox[3]));
    var typoDescent = override.descent || Math.round(scale * (properties.descent || bbox[1]));

    if (typoDescent > 0 && properties.descent > 0 && bbox[1] < 0) {
      typoDescent = -typoDescent;
    }

    var winAscent = override.yMax || typoAscent;
    var winDescent = -override.yMin || -typoDescent;
    return "\x00\x03" + "\x02\x24" + "\x01\xF4" + "\x00\x05" + "\x00\x00" + "\x02\x8A" + "\x02\xBB" + "\x00\x00" + "\x00\x8C" + "\x02\x8A" + "\x02\xBB" + "\x00\x00" + "\x01\xDF" + "\x00\x31" + "\x01\x02" + "\x00\x00" + "\x00\x00\x06" + String.fromCharCode(properties.fixedPitch ? 0x09 : 0x00) + "\x00\x00\x00\x00\x00\x00" + (0, _util.string32)(ulUnicodeRange1) + (0, _util.string32)(ulUnicodeRange2) + (0, _util.string32)(ulUnicodeRange3) + (0, _util.string32)(ulUnicodeRange4) + "\x2A\x32\x31\x2A" + string16(properties.italicAngle ? 1 : 0) + string16(firstCharIndex || properties.firstChar) + string16(lastCharIndex || properties.lastChar) + string16(typoAscent) + string16(typoDescent) + "\x00\x64" + string16(winAscent) + string16(winDescent) + "\x00\x00\x00\x00" + "\x00\x00\x00\x00" + string16(properties.xHeight) + string16(properties.capHeight) + string16(0) + string16(firstCharIndex || properties.firstChar) + "\x00\x03";
  }