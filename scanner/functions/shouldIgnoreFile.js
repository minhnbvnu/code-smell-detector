function shouldIgnoreFile(programNode) {
    return (
        programNode.parent &&
        programNode.parent.comments.some(c => COMMENT_FILE_RE.test(c.value))
    );
}