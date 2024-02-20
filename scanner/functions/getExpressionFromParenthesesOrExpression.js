function getExpressionFromParenthesesOrExpression(node) {
            if (isParenthesizedExpression(node)) {
                copyExpressionComments(node);
                node = node.expression;
            }
            return node;
        }