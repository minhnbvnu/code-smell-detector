function isValidStatement(node) {
            return isExpressionStatement(node) || isReturnStatement(node) || isVariableStatement(node);
        }