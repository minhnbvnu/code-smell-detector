function writeDecimalTextNode(node, decimal) {
  const string = decimal.toPrecision();
  node.appendChild(getDocument().createTextNode(string));
}