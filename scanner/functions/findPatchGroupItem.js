async function findPatchGroupItem(client, name) {
  const projectBrowser = await findProjectBrowser(client);
  const patchGroupItem = await projectBrowser.$(
    getSelectorForPatchInProjectBrowser(name)
  );
  await patchGroupItem.waitForExist({ timeout: 5000 });
  return patchGroupItem;
}