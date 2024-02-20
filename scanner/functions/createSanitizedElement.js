function createSanitizedElement(element) {
  // Start with an empty element of the same type to remove nested children
  // and non-localizable attributes defined by the translation.
  const clone = element.ownerDocument.createElement(element.localName);
  return shallowPopulateUsing(element, clone);
}