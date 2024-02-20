function isPropertyAccessEntityNameExpression(node) {
            return isPropertyAccessExpression(node) && isIdentifier(node.name) && isEntityNameExpression(node.expression);
        }