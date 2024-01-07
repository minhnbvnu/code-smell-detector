function readDecimal(node) {
  const s = getAllTextContent(node, false);
  return readDecimalString(s);
}