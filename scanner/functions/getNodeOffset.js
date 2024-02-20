function getNodeOffset(node) {
  if (node == null) {
    return {
      top: 0,
      left: 0
    };
  }

  const rect = node.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
}