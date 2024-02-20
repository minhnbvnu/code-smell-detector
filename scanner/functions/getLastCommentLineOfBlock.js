function getLastCommentLineOfBlock(commentStartLine) {
                const currentCommentEnd = commentEndLine[commentStartLine];
                return commentEndLine[currentCommentEnd + 1] ? getLastCommentLineOfBlock(currentCommentEnd + 1) : currentCommentEnd;
            }