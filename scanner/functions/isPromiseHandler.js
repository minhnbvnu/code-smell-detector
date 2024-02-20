function isPromiseHandler(node) {
            return isCallExpression(node) && (hasPropertyAccessExpressionWithName(node, "then") || hasPropertyAccessExpressionWithName(node, "catch") || hasPropertyAccessExpressionWithName(node, "finally"));
        }