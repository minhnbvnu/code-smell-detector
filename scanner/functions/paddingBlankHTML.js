function paddingBlankHTML(node) {
  if (!isVoid(node) && !nodeLength(node)) {
    node.innerHTML = blankHTML;
  }
}