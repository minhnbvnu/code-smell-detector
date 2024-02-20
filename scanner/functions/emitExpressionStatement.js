function emitExpressionStatement(node) {
                emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfExpressionStatement);
                if (!currentSourceFile || !isJsonSourceFile(currentSourceFile) || nodeIsSynthesized(node.expression)) {
                    writeTrailingSemicolon();
                }
            }