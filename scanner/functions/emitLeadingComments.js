function emitLeadingComments(pos, isEmittedNode) {
                hasWrittenComment = false;
                if (isEmittedNode) {
                    if (pos === 0 && (currentSourceFile == null ? void 0 : currentSourceFile.isDeclarationFile)) {
                        forEachLeadingCommentToEmit(pos, emitNonTripleSlashLeadingComment);
                    }
                    else {
                        forEachLeadingCommentToEmit(pos, emitLeadingComment);
                    }
                }
                else if (pos === 0) {
                    forEachLeadingCommentToEmit(pos, emitTripleSlashLeadingComment);
                }
            }