function getCommentsDeprecation() {
        throw new Error("`SourceCode#getComments()` is deprecated and will be removed in a future major version. Use `getCommentsBefore()`, `getCommentsAfter()`, and `getCommentsInside()` instead.");
    }