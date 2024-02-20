function isSuperProperty(node) {
            const kind = node.kind;
            return (kind === 208 /* PropertyAccessExpression */ || kind === 209 /* ElementAccessExpression */) && node.expression.kind === 106 /* SuperKeyword */;
        }