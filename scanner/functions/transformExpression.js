function transformExpression(returnContextNode, node, transformer, hasContinuation, continuationArgName) {
            if (isPromiseReturningCallExpression(node, transformer.checker, "then")) {
                return transformThen(node, elementAt(node.arguments, 0), elementAt(node.arguments, 1), transformer, hasContinuation, continuationArgName);
            }
            if (isPromiseReturningCallExpression(node, transformer.checker, "catch")) {
                return transformCatch(node, elementAt(node.arguments, 0), transformer, hasContinuation, continuationArgName);
            }
            if (isPromiseReturningCallExpression(node, transformer.checker, "finally")) {
                return transformFinally(node, elementAt(node.arguments, 0), transformer, hasContinuation, continuationArgName);
            }
            if (isPropertyAccessExpression(node)) {
                return transformExpression(returnContextNode, node.expression, transformer, hasContinuation, continuationArgName);
            }
            const nodeType = transformer.checker.getTypeAtLocation(node);
            if (nodeType && transformer.checker.getPromisedTypeOfPromise(nodeType)) {
                Debug.assertNode(getOriginalNode(node).parent, isPropertyAccessExpression);
                return transformPromiseExpressionOfPropertyAccess(returnContextNode, node, transformer, hasContinuation, continuationArgName);
            }
            return silentFail();
        }