function getNextTextNode(actual) {
  if (!actual.nextSibling) return undefined;
  if (actual.parent !== actual.nextSibling.parent) return undefined;
  if (isText(actual.nextSibling)) return actual.nextSibling;
  return getNextTextNode(actual.nextSibling);
}