function emitTrailingCommentsOfPosition(pos, prefixSpace, forceNoNewline) {
                if (commentsDisabled) {
                    return;
                }
                enterComment();
                forEachTrailingCommentToEmit(pos, prefixSpace ? emitTrailingComment : forceNoNewline ? emitTrailingCommentOfPositionNoNewline : emitTrailingCommentOfPosition);
                exitComment();
            }