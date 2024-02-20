function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
}