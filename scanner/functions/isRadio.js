function isRadio(node) {
  return isInput(node) && node.type === 'radio';
}