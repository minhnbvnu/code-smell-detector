function hasFallthroughComment(caseWhichFallsThrough, subsequentCase, context, fallthroughCommentPattern) {
        const sourceCode = context.getSourceCode();
        if (caseWhichFallsThrough.consequent.length === 1 && caseWhichFallsThrough.consequent[0].type === "BlockStatement") {
            const trailingCloseBrace = sourceCode.getLastToken(caseWhichFallsThrough.consequent[0]);
            const commentInBlock = sourceCode.getCommentsBefore(trailingCloseBrace).pop();
            if (commentInBlock && isFallThroughComment(commentInBlock.value, fallthroughCommentPattern)) {
                return true;
            }
        }
        const comment = sourceCode.getCommentsBefore(subsequentCase).pop();
        return Boolean(comment && isFallThroughComment(comment.value, fallthroughCommentPattern));
    }