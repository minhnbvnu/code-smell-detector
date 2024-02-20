function getBoundaryNode(path) {
  for (var ii = 0; ii < path.length; ++ii) {
    if (scopeTypes[path[ii].type]) {
      return path[ii];
    }
  }
  throw new Error(
    'Expected to find a node with one of the following types in path:\n' +
    JSON.stringify(Object.keys(scopeTypes))
  );
}