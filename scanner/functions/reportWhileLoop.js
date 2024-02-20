function reportWhileLoop(node) {
    context.report({
      node,
      message: 'Unallowed use of `while` loop. Use recursion instead'
    });
  }