function shouldHandleParams(node) {
  var arrow = tk.findPrev(node.body.startToken, '=>');
  // we don't check based on `node.params` because of `node.defaults`
  return tk.findPrevNonEmpty(arrow).value === ')';
}