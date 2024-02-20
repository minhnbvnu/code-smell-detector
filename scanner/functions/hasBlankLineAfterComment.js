function hasBlankLineAfterComment(token, commentStartLine) {
                return token.loc.start.line > getLastCommentLineOfBlock(commentStartLine) + 1;
            }