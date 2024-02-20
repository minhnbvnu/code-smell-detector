function rendered(client) {
  return assert.eventually.isTrue(waitForExist(client, '.Editor', 5000));
}