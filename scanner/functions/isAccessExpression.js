function isAccessExpression(node) {
            return node.kind === 208 /* PropertyAccessExpression */ || node.kind === 209 /* ElementAccessExpression */;
        }