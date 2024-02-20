function assertPinIsAcceptingLinks(client, nodeType, pinLabel) {
  return assert.eventually.include(
    findPin(client, nodeType, pinLabel).getAttribute('class'),
    'is-accepting-links'
  );
}