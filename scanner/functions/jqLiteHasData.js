function jqLiteHasData(node) {
  for (var key in jqCache[node.ng339]) {
    return true;
  }
  return false;
}