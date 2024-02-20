function contractPartOrder(node) {
  if (node.type === 'UsingForDeclaration') {
    return [0, 'using for declaration']
  }

  if (isTypeDeclaration(node)) {
    let label
    if (node.type === 'StructDefinition') {
      label = 'struct definition'
    } else {
      label = 'enum definition'
    }

    return [10, label]
  }

  if (node.type === 'StateVariableDeclaration') {
    return [20, 'state variable declaration']
  }

  if (node.type === 'EventDefinition') {
    return [30, 'event definition']
  }

  if (node.type === 'CustomErrorDefinition') {
    return [35, 'custom error definition']
  }

  if (node.type === 'ModifierDefinition') {
    return [40, 'modifier definition']
  }

  if (
    node.isConstructor ||
    (node.type === 'FunctionDefinition' &&
      node.name === 'initialize' &&
      isInitializerModifier(node.modifiers, 'initializer', null))
  ) {
    return [50, 'constructor/initializer']
  }

  if (isReceiveFunction(node)) {
    return [60, 'receive function']
  }

  if (isFallbackFunction(node)) {
    return [70, 'fallback function']
  }

  if (node.type === 'FunctionDefinition') {
    const { stateMutability, visibility } = node

    if (visibility === 'external') {
      const weight = getMutabilityWeight({ baseWeight: 80, stateMutability })
      const label = [visibility, stateMutability, 'function'].join(' ')

      return [weight, label]
    }

    if (visibility === 'public') {
      const weight = getMutabilityWeight({ baseWeight: 90, stateMutability })
      const label = [visibility, stateMutability, 'function'].join(' ')

      return [weight, label]
    }

    if (visibility === 'internal') {
      const weight = getMutabilityWeight({ baseWeight: 100, stateMutability })
      const label = [visibility, stateMutability, 'function'].join(' ')
      return [weight, label]
    }

    if (visibility === 'private') {
      const weight = getMutabilityWeight({ baseWeight: 110, stateMutability })
      const label = [visibility, stateMutability, 'function'].join(' ')
      return [weight, label]
    }

    throw new Error('Unknown order for function, please report this issue')
  }

  throw new Error('Unrecognized contract part, please report this issue')
}