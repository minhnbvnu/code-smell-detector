function isInNameOfExpressionWithTypeArguments(node) {
                while (node.parent.kind === 208 /* PropertyAccessExpression */) {
                    node = node.parent;
                }
                return node.parent.kind === 230 /* ExpressionWithTypeArguments */;
            }