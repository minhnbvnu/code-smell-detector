function normalizeTypeHintParams(node, state, typeHints) {
  var preCond = [];
  if (typeHints.params.length > 0) {
    typeHints.params.forEach(function(typeHint) {
      if (typeHint[1]) {
        preCond.push([
          typeHint[0],
          '\''+ type.parseAndNormalize(typeHint[1], typeHint[0], node) +'\'',
          '\''+ typeHint[0] +'\''
        ]);
      }
    });
  }

  var postCond = null;
  if (typeHints.returns) {
    postCond = type.parseAndNormalize(typeHints.returns, 'return', node);
  }

  // If static-only, then we don't need to pass the type hint
  // params since we're not going to do any dynamic checking.
  var pragmas = utils.getDocblock(state);
  if ('static-only' in pragmas) {
    return null;
  }

  var typeHintParams = {};
  if (preCond.length > 0) {
    typeHintParams.params = preCond;
  }
  if (postCond) {
    typeHintParams.returns = postCond;
  }
  return (preCond.length || postCond) ? typeHintParams : null;
}