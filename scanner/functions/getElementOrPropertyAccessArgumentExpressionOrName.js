function getElementOrPropertyAccessArgumentExpressionOrName(node) {
            if (isPropertyAccessExpression(node)) {
                return node.name;
            }
            const arg = skipParentheses(node.argumentExpression);
            if (isNumericLiteral(arg) || isStringLiteralLike(arg)) {
                return arg;
            }
            return node;
        }