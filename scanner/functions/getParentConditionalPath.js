function getParentConditionalPath(binding, path, name) {
  let parentPath;

  while (parentPath = path.parentPath) {
    if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) {
      if (path.key === "test") {
        return;
      }

      return parentPath;
    }

    if (parentPath.isFunction()) {
      if (parentPath.parentPath.scope.getBinding(name) !== binding) return;
    }

    path = parentPath;
  }
}