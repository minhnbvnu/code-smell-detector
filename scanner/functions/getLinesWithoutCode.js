function getLinesWithoutCode(comment) {
                let start = comment.loc.start.line;
                let end = comment.loc.end.line;
                let token;
                token = comment;
                do {
                    token = sourceCode.getTokenBefore(token, {
                        includeComments: true
                    });
                } while (isCommentNodeType(token));
                if (token && astUtils.isTokenOnSameLine(token, comment)) {
                    start += 1;
                }
                token = comment;
                do {
                    token = sourceCode.getTokenAfter(token, {
                        includeComments: true
                    });
                } while (isCommentNodeType(token));
                if (token && astUtils.isTokenOnSameLine(comment, token)) {
                    end -= 1;
                }
                if (start <= end) {
                    return range(start, end + 1);
                }
                return [];
            }