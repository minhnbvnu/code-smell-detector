function findRequires(ast) {
  var requires = [];
  traverseFlat(ast, function(node, scopeChain) {
    var requireData = getRequireData(node);
    if (requireData) {
      requires.push(requireData);
    }
    return !requireData;
  });
  return requires;
}