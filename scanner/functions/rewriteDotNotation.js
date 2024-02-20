function rewriteDotNotation(node) {
  if (node.computed === false || node.property.type != 'Literal') {
    return node
  }

  if (validIdentifier.test(node.property.value) &&
      !fu.elem(node.property.value, keywords)) {
    return {
      type: 'MemberExpression',
      computed: false,
      object: node.object,
      property: {
        type: 'Identifier',
        name: node.property.value
      }
    }
  } else {
    return node
  }
}