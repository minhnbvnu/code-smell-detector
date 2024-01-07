function writeBooleanTextNode(node, bool) {
  writeStringTextNode(node, bool ? '1' : '0');
}