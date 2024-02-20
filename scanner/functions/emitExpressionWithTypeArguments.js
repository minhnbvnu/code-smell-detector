function emitExpressionWithTypeArguments(node) {
                emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
                emitTypeArguments(node, node.typeArguments);
            }