function isArgumentOfElementAccessExpression(node) {
            return node && node.parent && node.parent.kind === 209 /* ElementAccessExpression */ && node.parent.argumentExpression === node;
        }