function isCalleeGlobal(t, callee, globalName) {
  return (
    t.isIdentifier(callee, {
      name: globalName,
    }) ||
    (t.isMemberExpression(callee) &&
      t.isIdentifier(callee.object, {
        name: globalName,
      }))
  )
}