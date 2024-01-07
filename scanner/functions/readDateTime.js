function readDateTime(node) {
  const s = getAllTextContent(node, false);
  const dateTime = Date.parse(s);
  return isNaN(dateTime) ? undefined : dateTime / 1000;
}