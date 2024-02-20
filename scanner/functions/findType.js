function findType(node, scope) {
    var finder = typeFinder[node.type];
    return finder ? finder(node, scope) : ANull;
  }