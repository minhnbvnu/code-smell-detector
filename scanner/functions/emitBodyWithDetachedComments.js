function emitBodyWithDetachedComments(node, detachedRange, emitCallback) {
                enterComment();
                const { pos, end } = detachedRange;
                const emitFlags = getEmitFlags(node);
                const skipLeadingComments = pos < 0 || (emitFlags & 1024 /* NoLeadingComments */) !== 0;
                const skipTrailingComments = commentsDisabled || end < 0 || (emitFlags & 2048 /* NoTrailingComments */) !== 0;
                if (!skipLeadingComments) {
                    emitDetachedCommentsAndUpdateCommentsInfo(detachedRange);
                }
                exitComment();
                if (emitFlags & 4096 /* NoNestedComments */ && !commentsDisabled) {
                    commentsDisabled = true;
                    emitCallback(node);
                    commentsDisabled = false;
                }
                else {
                    emitCallback(node);
                }
                enterComment();
                if (!skipTrailingComments) {
                    emitLeadingComments(detachedRange.end, 
                    /*isEmittedNode*/
                    true);
                    if (hasWrittenComment && !writer.isAtStartOfLine()) {
                        writer.writeLine();
                    }
                }
                exitComment();
            }