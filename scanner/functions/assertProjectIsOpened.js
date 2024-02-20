function assertProjectIsOpened(client, projectName) {
  const selector = `.PatchGroup__trigger.my .patch-group-trigger[data-id="${projectName}"`;
  return assert.eventually.isTrue(waitForExist(client, selector, 15000));
}