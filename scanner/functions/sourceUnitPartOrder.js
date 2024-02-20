function sourceUnitPartOrder(node) {
  if (node.type === 'PragmaDirective') {
    return [0, 'pragma directive']
  }

  if (node.type === 'ImportDirective') {
    return [10, 'import directive']
  }

  if (node.type === 'FileLevelConstant') {
    return [20, 'file level constant']
  }

  if (node.type === 'EnumDefinition' || node.type === 'StructDefinition') {
    return [30, 'type definition']
  }

  if (node.type === 'CustomErrorDefinition') {
    return [40, 'custom error definition']
  }

  if (node.type === 'FunctionDefinition') {
    return [50, 'free function definition']
  }

  if (node.type === 'ContractDefinition') {
    if (node.kind === 'interface') {
      return [60, 'interface']
    }

    if (node.kind === 'library') {
      return [70, 'library definition']
    }

    if (node.kind === 'contract') {
      return [80, 'contract definition']
    }
  }

  throw new Error('Unrecognized source unit part, please report this issue')
}