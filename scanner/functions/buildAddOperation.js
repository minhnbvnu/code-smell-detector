function buildAddOperation(num1, num2) {
    if (num2.type === "literal" && num2.number === 0) {
      return num1;
    }

    if (num1.type === "literal" && num1.number === 0) {
      return num2;
    }

    if (num2.type === "literal" && num1.type === "literal") {
      return new AstLiteral(num1.number + num2.number);
    }

    return new AstBinaryOperation("+", num1, num2, num1.min + num2.min, num1.max + num2.max);
  }