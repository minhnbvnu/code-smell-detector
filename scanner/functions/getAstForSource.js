function getAstForSource(source, options) {
  if (_astCache[source] && !options.disableAstCache) {
    return _astCache[source];
  }
  var ast = esprima.parse(source, {
    comment: true,
    loc: true,
    range: true,
    sourceType: options.sourceType
  });
  if (!options.disableAstCache) {
    _astCache[source] = ast;
  }
  return ast;
}