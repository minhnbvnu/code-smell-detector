function getFrontComments(comments, index) {
  let ret = [];
  while (index-- >= 0) {
    const comment = comments.get(index);
    if (!comment) {
      break;
    }
    ret.unshift(comment);
  }
  return ret;
}