function isValidFunctionReturnType(node, options) {
        if (options.allowHigherOrderFunctions &&
            doesImmediatelyReturnFunctionExpression(node)) {
            return true;
        }
        return (node.returnType != null ||
            (0, astUtils_1.isConstructor)(node.parent) ||
            (0, astUtils_1.isSetter)(node.parent));
    }