function getTransitionProperty(node) {
  return node.style.transitionProperty || node.style[getTransitionName()];
}