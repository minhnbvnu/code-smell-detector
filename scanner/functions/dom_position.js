function dom_position(node) {
  var offset = 0;

  while (node = node.previousSibling) {
    offset += 1;
  }

  return offset;
}