function parseRepeatStatement() {
    var body = parseBlock();
    expect('until');
    var condition = parseExpectedExpression();
    return finishNode(ast.repeatStatement(condition, body));
  }