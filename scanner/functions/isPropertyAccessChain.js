function isPropertyAccessChain(node) {
            return isPropertyAccessExpression(node) && !!(node.flags & 32 /* OptionalChain */);
        }