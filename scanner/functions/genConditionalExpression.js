function genConditionalExpression(node, context) {
    const { test, consequent, alternate, newline: needNewline } = node;
    const { push, indent, deindent, newline } = context;
    if (test.type === 4) {
      const needsParens = !isSimpleIdentifier(test.content);
      needsParens && push(`(`);
      genExpression(test, context);
      needsParens && push(`)`);
    } else {
      push(`(`);
      genNode(test, context);
      push(`)`);
    }
    needNewline && indent();
    context.indentLevel++;
    needNewline || push(` `);
    push(`? `);
    genNode(consequent, context);
    context.indentLevel--;
    needNewline && newline();
    needNewline || push(` `);
    push(`: `);
    const isNested = alternate.type === 19;
    if (!isNested) {
      context.indentLevel++;
    }
    genNode(alternate, context);
    if (!isNested) {
      context.indentLevel--;
    }
    needNewline && deindent(
      true
      /* without newline */
    );
  }