function parseExpectedExpression() {
    var expression = parseExpression();
    if (null == expression) raiseUnexpectedToken('<expression>', token);
    else return expression;
  }