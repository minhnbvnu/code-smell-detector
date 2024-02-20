function parseForStatement() {
    var variable = parseIdentifier()
      , body;
    if (options.scope) scopeIdentifier(variable);
    if (consume('=')) {
      var start = parseExpectedExpression();
      expect(',');
      var end = parseExpectedExpression();
      var step = consume(',') ? parseExpectedExpression() : null;

      expect('do');
      body = parseBlock();
      expect('end');

      return finishNode(ast.forNumericStatement(variable, start, end, step, body));
    }
    else {
      var variables = [variable];
      while (consume(',')) {
        variable = parseIdentifier();
        if (options.scope) scopeIdentifier(variable);
        variables.push(variable);
      }
      expect('in');
      var iterators = [];
      do {
        var expression = parseExpectedExpression();
        iterators.push(expression);
      } while (consume(','));

      expect('do');
      body = parseBlock();
      expect('end');

      return finishNode(ast.forGenericStatement(variables, iterators, body));
    }
  }