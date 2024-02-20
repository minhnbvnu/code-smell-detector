function emitPartiallyEmittedExpression(node) {
                const emitFlags = getEmitFlags(node);
                if (!(emitFlags & 1024 /* NoLeadingComments */) && node.pos !== node.expression.pos) {
                    emitTrailingCommentsOfPosition(node.expression.pos);
                }
                emitExpression(node.expression);
                if (!(emitFlags & 2048 /* NoTrailingComments */) && node.end !== node.expression.end) {
                    emitLeadingCommentsOfPosition(node.expression.end);
                }
            }