function emitCommentsBeforeNode(node) {
                const emitFlags = getEmitFlags(node);
                const commentRange = getCommentRange(node);
                emitLeadingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end);
                if (emitFlags & 4096 /* NoNestedComments */) {
                    commentsDisabled = true;
                }
            }