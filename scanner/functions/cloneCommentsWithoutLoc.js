function cloneCommentsWithoutLoc(comments) {
  return comments.map(({
    type,
    value
  }) => ({
    type,
    value,
    loc: null
  }));
}