function processStaticOnly(node, state) {
  var pragmas = utils.getDocblock(state);
  if (pragmas.typechecks === 'static-only') {
    var params = getTypeHintParams(node, state);
    normalizeTypeHintParams(node, state, params);
  }
}