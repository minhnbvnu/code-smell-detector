function parseSubExpression(minPrecedence) {
    var operator = token.value
      , expression, marker;

    if (trackLocations) marker = createLocationMarker();
    if (isUnary(token)) {
      markLocation();
      next();
      var argument = parseSubExpression(8);
      if (argument == null) raiseUnexpectedToken('<expression>', token);
      expression = finishNode(ast.unaryExpression(operator, argument));
    }
    if (null == expression) {
      expression = parsePrimaryExpression();
      if (null == expression) {
        expression = parsePrefixExpression();
      }
    }
    if (null == expression) return null;

    var precedence;
    while (true) {
      operator = token.value;

      precedence = (Punctuator === token.type || Keyword === token.type) ?
        binaryPrecedence(operator) : 0;

      if (precedence === 0 || precedence <= minPrecedence) break;
      if ('^' === operator || '..' === operator) precedence--;
      next();
      var right = parseSubExpression(precedence);
      if (null == right) raiseUnexpectedToken('<expression>', token);
      if (trackLocations) locations.push(marker);
      expression = finishNode(ast.binaryExpression(operator, expression, right));

    }
    return expression;
  }