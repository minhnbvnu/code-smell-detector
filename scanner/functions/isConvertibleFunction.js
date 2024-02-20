function isConvertibleFunction(node, checker) {
            return !isAsyncFunction(node) && node.body && isBlock(node.body) && hasReturnStatementWithPromiseHandler(node.body, checker) && returnsPromise(node, checker);
        }