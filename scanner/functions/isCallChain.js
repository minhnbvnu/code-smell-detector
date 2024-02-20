function isCallChain(node) {
            return isCallExpression(node) && !!(node.flags & 32 /* OptionalChain */);
        }