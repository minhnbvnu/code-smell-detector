function getTypeParametersFromNode(node, checker) {
        if (ts.isExpressionWithTypeArguments(node)) {
            return getTypeParametersFromType(node.expression, checker);
        }
        if (ts.isTypeReferenceNode(node)) {
            return getTypeParametersFromType(node.typeName, checker);
        }
        if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
            return getTypeParametersFromCall(node, checker);
        }
        return undefined;
    }