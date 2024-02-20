function type1FontGlyphMapping(properties, builtInEncoding, glyphNames) {
  var charCodeToGlyphId = Object.create(null);
  var glyphId, charCode, baseEncoding;

  if (properties.baseEncodingName) {
    // If a valid base encoding name was used, the mapping is initialized with
    // that.
    baseEncoding = Encodings[properties.baseEncodingName];
    for (charCode = 0; charCode < baseEncoding.length; charCode++) {
      glyphId = glyphNames.indexOf(baseEncoding[charCode]);
      if (glyphId >= 0) {
        charCodeToGlyphId[charCode] = glyphId;
      } else {
        charCodeToGlyphId[charCode] = 0; // notdef
      }
    }
  } else if (!!(properties.flags & FontFlags.Symbolic)) {
    // For a symbolic font the encoding should be the fonts built-in
    // encoding.
    for (charCode in builtInEncoding) {
      charCodeToGlyphId[charCode] = builtInEncoding[charCode];
    }
  } else {
    // For non-symbolic fonts that don't have a base encoding the standard
    // encoding should be used.
    baseEncoding = Encodings.StandardEncoding;
    for (charCode = 0; charCode < baseEncoding.length; charCode++) {
      glyphId = glyphNames.indexOf(baseEncoding[charCode]);
      if (glyphId >= 0) {
        charCodeToGlyphId[charCode] = glyphId;
      } else {
        charCodeToGlyphId[charCode] = 0; // notdef
      }
    }
  }

  // Lastly, merge in the differences.
  var differences = properties.differences;
  if (differences) {
    for (charCode in differences) {
      var glyphName = differences[charCode];
      glyphId = glyphNames.indexOf(glyphName);
      if (glyphId >= 0) {
        charCodeToGlyphId[charCode] = glyphId;
      } else {
        charCodeToGlyphId[charCode] = 0; // notdef
      }
    }
  }
  return charCodeToGlyphId;
}