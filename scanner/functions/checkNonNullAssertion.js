function checkNonNullAssertion(node) {
                return node.flags & 32 /* OptionalChain */ ? checkNonNullChain(node) : getNonNullableType(checkExpression(node.expression));
            }