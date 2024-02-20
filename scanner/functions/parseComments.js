function parseComments(programNode, state) {
  programNode.comments.forEach(function(c) {
    if (c.type !== 'Block') return;

    var comments;
    if (c.loc.start.line === c.loc.end.line &&
        typeHintExp.test(c.value)) {
      // inline comments
      comments = state.commentsByLine[c.loc.start.line] ||
        (state.commentsByLine[c.loc.start.line] = {});
      comments[c.loc.end.column] = c;

      comments = state.commentsByLine[c.loc.end.line] ||
        (state.commentsByLine[c.loc.start.line] = {});
      comments[c.loc.end.column] = c;
    } else {
      // docblocks
      state.docBlocksByLine[c.loc.end.line] = c;
    }
  });
}