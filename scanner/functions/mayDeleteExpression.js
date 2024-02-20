function mayDeleteExpression(node) {
            return (isBinaryExpression(node.parent) && node.parent.left === node || (isPostfixUnaryExpression(node.parent) || isPrefixUnaryExpression(node.parent)) && node.parent.operand === node) && isExpressionStatement(node.parent.parent);
        }