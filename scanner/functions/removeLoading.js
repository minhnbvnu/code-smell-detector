function removeLoading(node, loadingId) {
  const div = node.offsetParent.querySelector(`#${loadingId}`);
  if (div) {
    div.remove();
  }
}