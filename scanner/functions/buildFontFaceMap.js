function buildFontFaceMap(fontFaces) {
  var map = {};

  for (var i = 0; i < fontFaces.length; ++i) {
    var normalized = normalizeFontFace(fontFaces[i]);

    var name = normalized.family;
    var stretch = normalized.stretch;
    var style = normalized.style;
    var weight = normalized.weight;

    map[name] = map[name] || {};

    map[name][stretch] = map[name][stretch] || {};
    map[name][stretch][style] = map[name][stretch][style] || {};
    map[name][stretch][style][weight] = normalized;
  }

  return map;
}