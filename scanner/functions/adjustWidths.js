function adjustWidths(properties) {
  if (!properties.fontMatrix) {
    return;
  }

  if (properties.fontMatrix[0] === _util.FONT_IDENTITY_MATRIX[0]) {
    return;
  }

  var scale = 0.001 / properties.fontMatrix[0];
  var glyphsWidths = properties.widths;

  for (var glyph in glyphsWidths) {
    glyphsWidths[glyph] *= scale;
  }

  properties.defaultWidth *= scale;
}