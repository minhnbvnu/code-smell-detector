function isVoidZero(node) {
            return isVoidExpression(node) && isNumericLiteral(node.expression) && node.expression.text === "0";
        }