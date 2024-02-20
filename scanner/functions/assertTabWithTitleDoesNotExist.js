function assertTabWithTitleDoesNotExist(client, expectedTitle) {
  return assert.eventually.isFalse(
    client.isExisting(`.tab-name=${expectedTitle}`)
  );
}