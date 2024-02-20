function filterOutComments(nodeList) {
  return [].slice.call(nodeList).filter(node => !(node instanceof Comment));
}