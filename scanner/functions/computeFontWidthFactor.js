function computeFontWidthFactor (font) {
  var sum = 0;
  var digitsum = 0;
  var digits = 0;
  font.chars.map(function (ch) {
    sum += ch.xadvance;
    if (ch.id >= 48 && ch.id <= 57) {
      digits++;
      digitsum += ch.xadvance;
    }
  });
  return digits ? digitsum / digits : sum / font.chars.length;
}