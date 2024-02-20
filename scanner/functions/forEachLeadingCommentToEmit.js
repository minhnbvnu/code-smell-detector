function forEachLeadingCommentToEmit(pos, cb) {
                if (currentSourceFile && (containerPos === -1 || pos !== containerPos)) {
                    if (hasDetachedComments(pos)) {
                        forEachLeadingCommentWithoutDetachedComments(cb);
                    }
                    else {
                        forEachLeadingCommentRange(currentSourceFile.text, pos, cb, 
                        /*state*/
                        pos);
                    }
                }
            }