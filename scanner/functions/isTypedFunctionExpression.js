function isTypedFunctionExpression(node, options) {
        const parent = utils_1.ESLintUtils.nullThrows(node.parent, utils_1.ESLintUtils.NullThrowsReasons.MissingParent);
        if (!options.allowTypedFunctionExpressions) {
            return false;
        }
        return ((0, astUtils_1.isTypeAssertion)(parent) ||
            isVariableDeclaratorWithTypeAnnotation(parent) ||
            isPropertyDefinitionWithTypeAnnotation(parent) ||
            isPropertyOfObjectWithType(parent) ||
            isFunctionArgument(parent, node) ||
            isConstructorArgument(parent));
    }