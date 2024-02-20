function _guessExecutionStatusRelativeToDifferentFunctions(target) {
  if (!target.isFunctionDeclaration() || target.parentPath.isExportDeclaration()) {
    return "unknown";
  }

  const binding = target.scope.getBinding(target.node.id.name);
  if (!binding.references) return "before";
  const referencePaths = binding.referencePaths;
  let allStatus;

  for (const path of referencePaths) {
    const childOfFunction = !!path.find(path => path.node === target.node);
    if (childOfFunction) continue;

    if (path.key !== "callee" || !path.parentPath.isCallExpression()) {
      return "unknown";
    }

    if (executionOrderCheckedNodes.has(path.node)) continue;
    executionOrderCheckedNodes.add(path.node);

    const status = this._guessExecutionStatusRelativeTo(path);

    executionOrderCheckedNodes.delete(path.node);

    if (allStatus && allStatus !== status) {
      return "unknown";
    } else {
      allStatus = status;
    }
  }

  return allStatus;
}