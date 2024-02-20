function isConsecutiveComment(comment) {
                const previousTokenOrComment = sourceCode.getTokenBefore(comment, { includeComments: true });
                return Boolean(previousTokenOrComment &&
                    ["Block", "Line"].includes(previousTokenOrComment.type));
            }