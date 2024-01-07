function readBoolean(node) {
  const s = getAllTextContent(node, false);
  return readBooleanString(s);
}