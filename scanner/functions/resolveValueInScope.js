function resolveValueInScope(node, scope) {
  if (node.type === 'Literal') {
    return node.value;
  }
  if (node.type === 'Identifier') {
    const refs = scope.references;
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];
      if (ref.identifier.name === node.name) {
        if (ref.writeExpr != null) {
          return resolveValueInScope(ref.writeExpr, scope);
        }
      }
    }
  }
  return null;
}