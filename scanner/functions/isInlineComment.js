function isInlineComment(comment) {
                const previousToken = sourceCode.getTokenBefore(comment, { includeComments: true }), nextToken = sourceCode.getTokenAfter(comment, { includeComments: true });
                return Boolean(previousToken &&
                    nextToken &&
                    comment.loc.start.line === previousToken.loc.end.line &&
                    comment.loc.end.line === nextToken.loc.start.line);
            }