function isElementAllowed(element) {
  const allowed = ALLOWED_ELEMENTS[element.namespaceURI];
  if (!allowed) {
    return false;
  }

  return allowed.indexOf(element.tagName.toLowerCase()) !== -1;
}