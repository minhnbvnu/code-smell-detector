function emitCaseClause(node) {
                emitTokenWithComment(82 /* CaseKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);
                emitCaseOrDefaultClauseRest(node, node.statements, node.expression.end);
            }