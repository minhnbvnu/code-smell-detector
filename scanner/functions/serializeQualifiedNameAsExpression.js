function serializeQualifiedNameAsExpression(node) {
                return factory.createPropertyAccessExpression(serializeEntityNameAsExpression(node.left), node.right);
            }