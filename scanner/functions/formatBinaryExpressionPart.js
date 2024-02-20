function formatBinaryExpressionPart(state, node, parentNode, isRightHand) {
    var generator = state.generator;

    if (expressionNeedsParenthesis(node, parentNode, isRightHand)) {
      state.write('(');
      generator[node.type](node, state);
      state.write(')');
    } else {
      generator[node.type](node, state);
    }
  }