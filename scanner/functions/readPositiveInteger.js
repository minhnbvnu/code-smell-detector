function readPositiveInteger(node) {
  const s = getAllTextContent(node, false);
  return readNonNegativeIntegerString(s);
}