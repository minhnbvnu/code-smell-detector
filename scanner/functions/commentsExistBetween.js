function commentsExistBetween(left, right) {
                return sourceCode.getFirstTokenBetween(left, right, {
                    includeComments: true,
                    filter: astUtils.isCommentToken
                }) !== null;
            }