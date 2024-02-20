function parseLabelStatement() {
    var name = token.value
      , label = parseIdentifier();

    if (options.scope) {
      scopeIdentifierName('::' + name + '::');
      attachScope(label, true);
    }

    expect('::');
    return finishNode(ast.labelStatement(label));
  }