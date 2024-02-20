function isPromiseReturningCallExpression(node, checker, name) {
            if (!isCallExpression(node))
                return false;
            const isExpressionOfName = hasPropertyAccessExpressionWithName(node, name);
            const nodeType = isExpressionOfName && checker.getTypeAtLocation(node);
            return !!(nodeType && checker.getPromisedTypeOfPromise(nodeType));
        }