function getFbOnlyRequires(node) {
    const id = node.arguments[0].value;
    const resolved = resolveFrom(dirname, id);
    // Exclude modules that are not found.
    if (resolved == null || !isFbOnlyFile(resolved)) {
      return false;
    }
    const startLine = node.loc.start.line;
    const hasFlowFbCommentBefore =
      context
        .getSourceCode()
        .getAllComments()
        .find(comment => {
          return (
            comment.type === 'Line' &&
            comment.loc.end.line === startLine - 1 &&
            comment.value.indexOf(' $FlowFB') !== -1
          );
        }) != null;
    return !hasFlowFbCommentBefore;
  }