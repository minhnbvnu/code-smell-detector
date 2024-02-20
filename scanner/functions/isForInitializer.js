function isForInitializer(node) {
            return isVariableDeclarationList(node) || isExpression(node);
        }