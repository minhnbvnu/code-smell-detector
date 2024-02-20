function reportForLoop(node) {
    context.report({
      node,
      message: 'Unallowed use of `for` loop'
    });
  }