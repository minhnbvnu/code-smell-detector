function emitAssertEntry(node) {
                emit(node.name);
                writePunctuation(":");
                writeSpace();
                const value = node.value;
                if ((getEmitFlags(value) & 1024 /* NoLeadingComments */) === 0) {
                    const commentRange = getCommentRange(value);
                    emitTrailingCommentsOfPosition(commentRange.pos);
                }
                emit(value);
            }