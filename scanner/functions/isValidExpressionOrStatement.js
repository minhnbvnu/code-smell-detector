function isValidExpressionOrStatement(node) {
            return isValidExpression(node) || isValidStatement(node);
        }