function writeCDATASection(node, string) {
  node.appendChild(getDocument().createCDATASection(string));
}