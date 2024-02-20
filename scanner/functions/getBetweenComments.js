function getBetweenComments(comments, begin, end) {
  let ret = [];

  for (; begin < end; begin++) {
    const comment = comments.get(begin);
    if (!comment) {
      continue;
    }
    ret.push(comment);
  }
  return ret;
}