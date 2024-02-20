function emitCallExpression(node) {
                const indirectCall = getInternalEmitFlags(node) & 16 /* IndirectCall */;
                if (indirectCall) {
                    writePunctuation("(");
                    writeLiteral("0");
                    writePunctuation(",");
                    writeSpace();
                }
                emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
                if (indirectCall) {
                    writePunctuation(")");
                }
                emit(node.questionDotToken);
                emitTypeArguments(node, node.typeArguments);
                emitExpressionList(node, node.arguments, 2576 /* CallExpressionArguments */, parenthesizer.parenthesizeExpressionForDisallowedComma);
            }