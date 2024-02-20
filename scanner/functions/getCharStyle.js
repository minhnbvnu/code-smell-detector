function getCharStyle(c) {
  var o = convertAiColor(c.fillColor);
  var caps = String(c.capitalization);
  o.aifont = c.textFont.name;
  o.size = Math.round(c.size);
  o.capitalization = caps == 'FontCapsOption.NORMALCAPS' ? '' : caps;
  o.tracking = c.tracking;
  o.superscript = c.baselinePosition == FontBaselineOption.SUPERSCRIPT;
  o.subscript = c.baselinePosition == FontBaselineOption.SUBSCRIPT;
  return o;
}