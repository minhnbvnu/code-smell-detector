function writeNonNegativeIntegerTextNode(node, nonNegativeInteger) {
  const string = nonNegativeInteger.toString();
  node.appendChild(getDocument().createTextNode(string));
}