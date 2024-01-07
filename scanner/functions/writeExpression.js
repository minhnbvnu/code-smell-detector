function writeExpression(ns, tagName, node, value) {
  const property = createElementNS(ns, tagName);
  writeStringTextNode(property, value);
  node.appendChild(property);
}