function emitPropertyAssignment(node) {
                emit(node.name);
                writePunctuation(":");
                writeSpace();
                const initializer = node.initializer;
                if ((getEmitFlags(initializer) & 1024 /* NoLeadingComments */) === 0) {
                    const commentRange = getCommentRange(initializer);
                    emitTrailingCommentsOfPosition(commentRange.pos);
                }
                emitExpression(initializer, parenthesizer.parenthesizeExpressionForDisallowedComma);
            }