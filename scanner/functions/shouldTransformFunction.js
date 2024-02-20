function shouldTransformFunction(node, state, pragmas, params) {
  if (!shouldTransformFile(state, pragmas)) {
    throw new Error(
      'shouldTransformFunction should not be called if shouldTransformFile ' +
      'fails'
    );
  }

  return (params.params && params.params.length > 0) ||
    params.returns ||
    (node.id && /^[A-Z]/.test(node.id.name));
}