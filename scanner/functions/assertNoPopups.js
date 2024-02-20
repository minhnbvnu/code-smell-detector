function assertNoPopups(client) {
  return assert.eventually.isFalse(findPopup(client).isVisible());
}