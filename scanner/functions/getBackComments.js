function getBackComments(comments, index) {
  let ret = [];
  while (index++) {
    const comment = comments.get(index);
    if (!comment) {
      break;
    }
    ret.push(comment);
  }
  return ret;
}