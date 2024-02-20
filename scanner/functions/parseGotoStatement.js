function parseGotoStatement() {
    var name = token.value
      , label = parseIdentifier();

    if (options.scope) label.isLabel = scopeHasName('::' + name + '::');
    return finishNode(ast.gotoStatement(label));
  }