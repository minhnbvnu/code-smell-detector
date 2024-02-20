function isTypeDeclaration(node) {
  return ['StructDefinition', 'EnumDefinition'].includes(node.type)
}