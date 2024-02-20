function doesExponentNeedParens(exponent) {
        // '**' is right-associative, there is no need for parens when Math.pow(a, b ** c) is converted to a ** b ** c
        return astUtils.getPrecedence(exponent) < PRECEDENCE_OF_EXPONENTIATION_EXPR;
    }