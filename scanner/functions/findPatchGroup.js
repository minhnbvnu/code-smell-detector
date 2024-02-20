async function findPatchGroup(client, groupTitle) {
  const projectBrowser = await findProjectBrowser(client);
  const patchGroup = await projectBrowser.$(`.PatchGroup=${groupTitle}`);
  await patchGroup.waitForExist({ timeout: 5000 });
  return patchGroup;
}