function getElementIndex(node) {
  let index = 0;
  while ((node = node.previousElementSibling)) {
    index++;
  }

  return index;
}