function dom_isCell(node) {
  return node && /^TD|^TH/.test(node.nodeName.toUpperCase());
}