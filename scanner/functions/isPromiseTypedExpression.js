function isPromiseTypedExpression(node, checker) {
            if (!isExpression(node))
                return false;
            return !!checker.getPromisedTypeOfPromise(checker.getTypeAtLocation(node));
        }