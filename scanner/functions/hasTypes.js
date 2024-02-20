function hasTypes(node, param) {
  return node.typeParameters || node.returnType || param.typeAnnotation || param.optional || param.trailingComments;
}