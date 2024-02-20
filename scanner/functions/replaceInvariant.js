function replaceInvariant(path) {
    const node = path.node;

    t.assertCallExpression(node);
    t.assertIdentifier(node.callee, {name: 'invariant'});

    if (node.arguments[0] == null) {
      throw path.buildCodeFrameError(
        '`invariant()` must at least one argument.',
      );
    }

    const stmtParent = path.getStatementParent();

    if (stmtParent.type !== 'ExpressionStatement') {
      throw path.buildCodeFrameError(
        '`invariant()` must be used as an expression statement.',
      );
    }

    stmtParent.replaceWith(
      buildIfThrow({
        CONDITION: node.arguments[0],
        MESSAGE:
          node.arguments[1] ||
          t.stringLiteral(
            'Invariant violation: ' +
              JSON.stringify(path.get('arguments.0').getSource()),
          ),
      }),
    );
  }