function checkIndexedAccess(node, checkMode) {
                return node.flags & 32 /* OptionalChain */ ? checkElementAccessChain(node, checkMode) : checkElementAccessExpression(node, checkNonNullExpression(node.expression), checkMode);
            }