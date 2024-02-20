function isValidFunctionExpressionReturnType(node, options) {
        if (isTypedFunctionExpression(node, options)) {
            return true;
        }
        const parent = utils_1.ESLintUtils.nullThrows(node.parent, utils_1.ESLintUtils.NullThrowsReasons.MissingParent);
        if (options.allowExpressions &&
            parent.type !== utils_1.AST_NODE_TYPES.VariableDeclarator &&
            parent.type !== utils_1.AST_NODE_TYPES.MethodDefinition &&
            parent.type !== utils_1.AST_NODE_TYPES.ExportDefaultDeclaration &&
            parent.type !== utils_1.AST_NODE_TYPES.PropertyDefinition) {
            return true;
        }
        // https://github.com/typescript-eslint/typescript-eslint/issues/653
        return (options.allowDirectConstAssertionInArrowFunctions === true &&
            node.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression &&
            returnsConstAssertionDirectly(node));
    }