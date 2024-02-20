function forEachLeadingCommentWithoutDetachedComments(cb) {
                if (!currentSourceFile)
                    return;
                const pos = last(detachedCommentsInfo).detachedCommentEndPos;
                if (detachedCommentsInfo.length - 1) {
                    detachedCommentsInfo.pop();
                }
                else {
                    detachedCommentsInfo = void 0;
                }
                forEachLeadingCommentRange(currentSourceFile.text, pos, cb, 
                /*state*/
                pos);
            }