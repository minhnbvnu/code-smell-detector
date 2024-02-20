function isElementAccessChain(node) {
            return isElementAccessExpression(node) && !!(node.flags & 32 /* OptionalChain */);
        }