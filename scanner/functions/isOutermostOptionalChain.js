function isOutermostOptionalChain(node) {
            return !isOptionalChain(node.parent) || isOptionalChainRoot(node.parent) || node !== node.parent.expression;
        }