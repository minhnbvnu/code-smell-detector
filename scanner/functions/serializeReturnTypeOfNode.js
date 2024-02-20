function serializeReturnTypeOfNode(node) {
                if (isFunctionLike(node) && node.type) {
                    return serializeTypeNode(node.type);
                }
                else if (isAsyncFunction(node)) {
                    return factory.createIdentifier("Promise");
                }
                return factory.createVoidZero();
            }