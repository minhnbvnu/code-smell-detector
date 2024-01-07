function writeStringTextNode(node, string) {
  node.appendChild(getDocument().createTextNode(string));
}