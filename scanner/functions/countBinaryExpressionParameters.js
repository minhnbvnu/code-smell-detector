function countBinaryExpressionParameters(b) {
            return isBinaryExpression(b.left) ? countBinaryExpressionParameters(b.left) + 1 : 2;
        }