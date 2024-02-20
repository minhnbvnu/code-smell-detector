function isDeleteTarget(node) {
            if (node.kind !== 208 /* PropertyAccessExpression */ && node.kind !== 209 /* ElementAccessExpression */) {
                return false;
            }
            node = walkUpParenthesizedExpressions(node.parent);
            return node && node.kind === 217 /* DeleteExpression */;
        }