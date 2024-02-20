function emitNewExpression(node) {
                emitTokenWithComment(103 /* NewKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfNew);
                emitTypeArguments(node, node.typeArguments);
                emitExpressionList(node, node.arguments, 18960 /* NewExpressionArguments */, parenthesizer.parenthesizeExpressionForDisallowedComma);
            }