function printOwnersList(elements, includeWeight = false) {
  return elements.map(element => printElement(element, includeWeight)).join('\n');
}