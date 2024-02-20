async function assertNodeUnavailableInProjectBrowser(client, nodeName) {
  const projectBrowser = await findProjectBrowser(client);
  const patchInProjectBrowser = await projectBrowser.$(
    getSelectorForPatchInProjectBrowser(nodeName)
  );

  return assert.eventually.isFalse(
    patchInProjectBrowser.isDisplayed(),
    `Expected node "${nodeName}" to be unavailable in the project browser`
  );
}