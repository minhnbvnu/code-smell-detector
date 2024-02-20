function isExpressionOfOptionalChainRoot(node) {
            return isOptionalChainRoot(node.parent) && node.parent.expression === node;
        }