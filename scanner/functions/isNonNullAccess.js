function isNonNullAccess(node) {
            const kind = node.kind;
            return (kind === 208 /* PropertyAccessExpression */ || kind === 209 /* ElementAccessExpression */) && isNonNullExpression(node.expression);
        }