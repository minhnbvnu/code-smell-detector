function extendCommentRange(comment, tokens) {
            var target;
            target = upperBound(tokens, function search(token) {
                return token.range[0] > comment.range[0];
            });
            comment.extendedRange = [comment.range[0], comment.range[1]];
            if (target !== tokens.length) {
                comment.extendedRange[1] = tokens[target].range[0];
            }
            target -= 1;
            if (target >= 0) {
                comment.extendedRange[0] = tokens[target].range[1];
            }
            return comment;
        }