function getNameOfAccessExpression(node) {
            if (node.kind === 208 /* PropertyAccessExpression */) {
                return node.name;
            }
            Debug.assert(node.kind === 209 /* ElementAccessExpression */);
            return node.argumentExpression;
        }