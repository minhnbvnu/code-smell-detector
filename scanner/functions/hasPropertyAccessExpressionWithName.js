function hasPropertyAccessExpressionWithName(node, funcName) {
            if (!isPropertyAccessExpression(node.expression)) {
                return false;
            }
            return node.expression.name.text === funcName;
        }