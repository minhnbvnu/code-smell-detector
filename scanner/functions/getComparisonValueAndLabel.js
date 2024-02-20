function getComparisonValueAndLabel(node) {
  if (isTypeDeclaration(node)) {
    let label
    if (node.type === 'StructDefinition') {
      label = 'struct definition'
    } else {
      label = 'enum definition'
    }
    return [0, label]
  }

  if (node.type === 'StateVariableDeclaration') {
    return [10, 'state variable declaration']
  }

  if (node.type === 'EventDefinition') {
    return [20, 'event definition']
  }

  if (node.isConstructor) {
    return [30, 'constructor']
  }

  if (isFallbackFunction(node)) {
    return [40, 'fallback function']
  }

  if (node.type === 'FunctionDefinition') {
    if (node.visibility === 'external' && !isConst(node)) {
      return [50, 'external function']
    }
    if (node.visibility === 'external' && isConst(node)) {
      return [60, 'external const function']
    }
    if (node.visibility === 'public' && !isConst(node)) {
      return [70, 'public function']
    }
    if (node.visibility === 'public' && isConst(node)) {
      return [80, 'public const function']
    }
    if (node.visibility === 'internal') {
      return [90, 'internal function']
    }
    if (node.visibility === 'private') {
      return [100, 'private function']
    }
    throw new Error('Unknown order for function, please report this issue')
  }

  throw new Error('Unrecognized contract part, please report this issue')
}