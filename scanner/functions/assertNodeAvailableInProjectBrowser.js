async function assertNodeAvailableInProjectBrowser(client, nodeName) {
  const projectBrowser = await findProjectBrowser(client);
  const patchInProjectBrowser = await projectBrowser.$(
    getSelectorForPatchInProjectBrowser(nodeName)
  );

  return assert.eventually.isTrue(
    patchInProjectBrowser.isDisplayed(),
    `Expected node "${nodeName}" to be available in the project browser`
  );
}