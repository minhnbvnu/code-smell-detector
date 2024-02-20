async function clickAddPatch(client) {
  const projectBrowser = await findProjectBrowser(client);
  const addPatchButton = await projectBrowser.$('button[title="Add patch"]');
  return addPatchButton.click();
}