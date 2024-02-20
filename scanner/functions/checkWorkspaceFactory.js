function checkWorkspaceFactory(node) {
    if (
      node.callee.type !== 'MemberExpression' ||
      node.callee.property.name !== 'registerFactory'
    ) {
      return;
    }
    const args = node.arguments;
    if (args.length !== 1 || args[0].type !== 'ObjectExpression') {
      return;
    }
    for (const prop of args[0].properties) {
      if (prop.key.name === 'toggleCommand' && prop.value.type === 'Literal') {
        checkLiterals([prop.value], context);
      }
    }
  }