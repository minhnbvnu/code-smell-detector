function recoverGlyphName(name, glyphsUnicodeMap) {
  if (glyphsUnicodeMap[name] !== undefined) {
    return name;
  }

  var unicode = (0, _unicode.getUnicodeForGlyph)(name, glyphsUnicodeMap);

  if (unicode !== -1) {
    for (var key in glyphsUnicodeMap) {
      if (glyphsUnicodeMap[key] === unicode) {
        return key;
      }
    }
  }

  (0, _util.info)("Unable to recover a standard glyph name for: " + name);
  return name;
}