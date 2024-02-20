function parseTableConstructor() {
    var fields = []
      , key, value;

    while (true) {
      markLocation();
      if (Punctuator === token.type && consume('[')) {
        key = parseExpectedExpression();
        expect(']');
        expect('=');
        value = parseExpectedExpression();
        fields.push(finishNode(ast.tableKey(key, value)));
      } else if (Identifier === token.type) {
        key = parseExpectedExpression();
        if (consume('=')) {
          value = parseExpectedExpression();
          fields.push(finishNode(ast.tableKeyString(key, value)));
        } else {
          fields.push(finishNode(ast.tableValue(key)));
        }
      } else {
        if (null == (value = parseExpression())) {
          locations.pop();
          break;
        }
        fields.push(finishNode(ast.tableValue(value)));
      }
      if (',;'.indexOf(token.value) >= 0) {
        next();
        continue;
      }
      if ('}' === token.value) break;
    }
    expect('}');
    return finishNode(ast.tableConstructorExpression(fields));
  }