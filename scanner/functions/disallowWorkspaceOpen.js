function disallowWorkspaceOpen(node) {
    if (isSpecFile(context.getFilename())) {
      return;
    }
    if (
      node.callee.type === 'MemberExpression' &&
      node.callee.object.type === 'MemberExpression' &&
      node.callee.object.object.type === 'Identifier' &&
      node.callee.object.object.name === 'atom' &&
      node.callee.object.property.type === 'Identifier' &&
      node.callee.object.property.name === 'workspace' &&
      node.callee.property.type === 'Identifier'
    ) {
      const message = DISALLOWED_WORKSPACE_METHODS[node.callee.property.name];
      if (message != null) {
        context.report({node, message});
      }
    }
  }