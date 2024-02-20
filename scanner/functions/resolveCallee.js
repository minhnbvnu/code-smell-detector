function resolveCallee(node) {
  let type = node.type;
  if (node.type === "MemberExpression") {
    return node.object;
  }
  return node;
}