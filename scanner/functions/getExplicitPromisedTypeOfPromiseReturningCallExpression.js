function getExplicitPromisedTypeOfPromiseReturningCallExpression(node, callback, checker) {
            if (node.expression.name.escapedText === "finally") {
                return void 0;
            }
            const promiseType = checker.getTypeAtLocation(node.expression.expression);
            if (isReferenceToType(promiseType, checker.getPromiseType()) || isReferenceToType(promiseType, checker.getPromiseLikeType())) {
                if (node.expression.name.escapedText === "then") {
                    if (callback === elementAt(node.arguments, 0)) {
                        return elementAt(node.typeArguments, 0);
                    }
                    else if (callback === elementAt(node.arguments, 1)) {
                        return elementAt(node.typeArguments, 1);
                    }
                }
                else {
                    return elementAt(node.typeArguments, 0);
                }
            }
        }