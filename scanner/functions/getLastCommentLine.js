function getLastCommentLine(comment) {
                if (isLineComment(comment)) {
                    return comment.value;
                }
                // For multiline comments - we look at only the last line.
                const commentlines = comment.value.split('\n');
                return commentlines[commentlines.length - 1];
            }