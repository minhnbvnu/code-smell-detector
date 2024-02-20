function removeHiddenElements(node) {
  $('script', node).remove();
  $('style', node).remove();
  return node;
}