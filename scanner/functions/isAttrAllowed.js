function isAttrAllowed(attr, element) {
  const allowed = ALLOWED_ATTRIBUTES[element.namespaceURI];
  if (!allowed) {
    return false;
  }

  const attrName = attr.name.toLowerCase();
  const elemName = element.tagName.toLowerCase();

  // Is it a globally safe attribute?
  if (allowed.global.indexOf(attrName) !== -1) {
    return true;
  }

  // Are there no allowed attributes for this element?
  if (!allowed[elemName]) {
    return false;
  }

  // Is it allowed on this element?
  if (allowed[elemName].indexOf(attrName) !== -1) {
    return true;
  }

  // Special case for value on HTML inputs with type button, reset, submit
  if (element.namespaceURI === 'http://www.w3.org/1999/xhtml' &&
      elemName === 'input' && attrName === 'value') {
    const type = element.type.toLowerCase();
    if (type === 'submit' || type === 'button' || type === 'reset') {
      return true;
    }
  }

  return false;
}