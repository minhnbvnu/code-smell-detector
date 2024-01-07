function buildSubOperation(num1, num2) {
    if (num2.type === "literal") {
      if (num2.number === 0) {
        return num1;
      } else if (num1.type === "literal") {
        return new AstLiteral(num1.number - num2.number);
      }
    }

    if (num2.type === "binary" && num2.op === "-" && num1.type === "literal" && num1.number === 1 && num2.arg1.type === "literal" && num2.arg1.number === 1) {
      return num2.arg2;
    }

    return new AstBinaryOperation("-", num1, num2, num1.min - num2.max, num1.max - num2.min);
  }