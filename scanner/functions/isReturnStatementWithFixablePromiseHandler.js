function isReturnStatementWithFixablePromiseHandler(node, checker) {
            return isReturnStatement(node) && !!node.expression && isFixablePromiseHandler(node.expression, checker);
        }