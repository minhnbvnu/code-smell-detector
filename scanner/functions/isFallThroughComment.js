function isFallThroughComment(comment, fallthroughCommentPattern) {
        return fallthroughCommentPattern.test(comment) && !directivesPattern.test(comment.trim());
    }