function emitExportAssignment(node) {
                const nextPos = emitTokenWithComment(93 /* ExportKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                if (node.isExportEquals) {
                    emitTokenWithComment(63 /* EqualsToken */, nextPos, writeOperator, node);
                }
                else {
                    emitTokenWithComment(88 /* DefaultKeyword */, nextPos, writeKeyword, node);
                }
                writeSpace();
                emitExpression(node.expression, node.isExportEquals ? parenthesizer.getParenthesizeRightSideOfBinaryForOperator(63 /* EqualsToken */) : parenthesizer.parenthesizeExpressionOfExportDefault);
                writeTrailingSemicolon();
            }