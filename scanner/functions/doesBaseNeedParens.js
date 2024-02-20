function doesBaseNeedParens(base) {
        return (
        // '**' is right-associative, parens are needed when Math.pow(a ** b, c) is converted to (a ** b) ** c
        astUtils.getPrecedence(base) <= PRECEDENCE_OF_EXPONENTIATION_EXPR ||
            // An unary operator cannot be used immediately before an exponentiation expression
            base.type === "AwaitExpression" ||
            base.type === "UnaryExpression");
    }