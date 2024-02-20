function getOuterFunction(path) {
  return (path.scope.getFunctionParent() || path.scope.getProgramParent()).path;
}