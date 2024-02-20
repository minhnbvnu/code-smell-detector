function reportUseOutsideOfComparison(context, node) {
  if (!isComparison(node)) {
    context.report({
      node,
      message: 'Unallowed use of `null` or `undefined`'
    });
  }
}