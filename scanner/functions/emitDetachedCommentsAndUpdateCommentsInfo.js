function emitDetachedCommentsAndUpdateCommentsInfo(range) {
                const currentDetachedCommentInfo = currentSourceFile && emitDetachedComments(currentSourceFile.text, getCurrentLineMap(), writer, emitComment, range, newLine, commentsDisabled);
                if (currentDetachedCommentInfo) {
                    if (detachedCommentsInfo) {
                        detachedCommentsInfo.push(currentDetachedCommentInfo);
                    }
                    else {
                        detachedCommentsInfo = [currentDetachedCommentInfo];
                    }
                }
            }