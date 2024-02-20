function getCommentLines(commentGroup) {
                const [firstComment] = commentGroup;
                if (firstComment.type === "Line") {
                    return processSeparateLineComments(commentGroup);
                }
                if (isStarredBlockComment(commentGroup)) {
                    return processStarredBlockComment(firstComment);
                }
                return processBareBlockComment(firstComment);
            }