function appendIfCommentDirective(commentDirectives2, text2, commentDirectiveRegEx, lineStart) {
                const type = getDirectiveFromComment(trimStringStart(text2), commentDirectiveRegEx);
                if (type === void 0) {
                    return commentDirectives2;
                }
                return append(commentDirectives2, {
                    range: { pos: lineStart, end: pos },
                    type
                });
            }