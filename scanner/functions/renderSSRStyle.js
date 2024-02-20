function renderSSRStyle (
  staticStyle,
  dynamic,
  extra
) {
  var style = {};
  if (staticStyle) { extend(style, staticStyle); }
  if (dynamic) { extend(style, normalizeStyleBinding(dynamic)); }
  if (extra) { extend(style, extra); }
  var res = genStyle(style);
  return res === '' ? res : (" style=" + (JSON.stringify(cachedEscape(res))))
}