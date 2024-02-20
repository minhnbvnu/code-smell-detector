function appendCommentRange(pos, end, kind, hasTrailingNewLine, _state, comments = []) {
            comments.push({ kind, pos, end, hasTrailingNewLine });
            return comments;
        }