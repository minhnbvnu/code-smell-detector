function maybeCloneComments(comments, deep, withoutLoc) {
  if (!comments || !deep) {
    return comments;
  }

  return comments.map(({
    type,
    value,
    loc
  }) => {
    if (withoutLoc) {
      return {
        type,
        value,
        loc: null
      };
    }

    return {
      type,
      value,
      loc
    };
  });
}