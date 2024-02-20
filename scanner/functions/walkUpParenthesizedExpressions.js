function walkUpParenthesizedExpressions(node) {
            return walkUp(node, 214 /* ParenthesizedExpression */);
        }