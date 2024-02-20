function createTextNodeFromTextContent(element) {
  return element.ownerDocument.createTextNode(element.textContent);
}