function assertProjectBrowserHasInstallingLib(client, libName) {
  const selector = '.PatchGroup--installing';
  return assert.eventually.equal(
    client
      .$(selector)
      .then(el => el.waitForExist({ timeout: 10000 }).then(() => el.$('.name')))
      .then(el => el.getText()),
    libName
  );
}