function getIndexOfType(element) {
  let index = 0;
  let child;
  while ((child = element.previousElementSibling)) {
    if (child.tagName === element.tagName) {
      index++;
    }
  }
  return index;
}