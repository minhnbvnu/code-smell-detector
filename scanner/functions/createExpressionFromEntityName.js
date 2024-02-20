function createExpressionFromEntityName(factory2, node) {
            if (isQualifiedName(node)) {
                const left = createExpressionFromEntityName(factory2, node.left);
                const right = setParent(setTextRange(factory2.cloneNode(node.right), node.right), node.right.parent);
                return setTextRange(factory2.createPropertyAccessExpression(left, right), node);
            }
            else {
                return setParent(setTextRange(factory2.cloneNode(node), node), node.parent);
            }
        }