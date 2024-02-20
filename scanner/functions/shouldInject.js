function shouldInject(t, path) {
  const { expression } = path.node
  if (!t.isCallExpression(expression)) {
    return false
  }
  const { callee } = expression
  const globalName = globals.find(x => isCalleeGlobal(t, callee, x))
  if (!globalName || path.scope.hasBinding(globalName)) {
    return false
  }
  return !path.hub.file.opts.injected
}