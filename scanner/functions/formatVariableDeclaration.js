function formatVariableDeclaration(state, node) {
    var generator = state.generator;
    var declarations = node.declarations;

    state.write(node.kind + ' ');
    var length = declarations.length;

    if (length > 0) {
      generator.VariableDeclarator(declarations[0], state);
      for (var i = 1; i < length; i++) {
        state.write(', ');
        generator.VariableDeclarator(declarations[i], state);
      }
    }
  }