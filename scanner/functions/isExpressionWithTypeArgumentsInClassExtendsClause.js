function isExpressionWithTypeArgumentsInClassExtendsClause(node) {
            return tryGetClassExtendingExpressionWithTypeArguments(node) !== void 0;
        }