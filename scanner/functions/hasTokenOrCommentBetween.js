function hasTokenOrCommentBetween(before, after) {
                return sourceCode.getTokensBetween(before, after, { includeComments: true }).length !== 0;
            }