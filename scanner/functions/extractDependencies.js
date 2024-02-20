function extractDependencies(code) {
  const ast = babylon.parse(code);
  const dependencies = new Set();
  const dependencyOffsets = [];

  babel.traverse(ast, {
    CallExpression(path) {
      const node = path.node;
      const callee = node.callee;
      const arg = node.arguments[0];
      if (callee.type !== 'Identifier' || callee.name !== 'require' || !arg || arg.type !== 'StringLiteral') {
        return;
      }
      dependencyOffsets.push(arg.start);
      dependencies.add(arg.value);
    }
  });

  return {dependencyOffsets, dependencies: Array.from(dependencies)};
}