function isNonNullChain(node) {
            return isNonNullExpression(node) && !!(node.flags & 32 /* OptionalChain */);
        }