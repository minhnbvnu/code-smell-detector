async function openProjectBrowserPatchContextMenu(client, name) {
  await selectPatchInProjectBrowser(client, name);

  const selector = getSelectorForPatchInProjectBrowser(name);
  const contextMenuIcon = await client.$(`${selector} .contextmenu`);
  await contextMenuIcon.waitForExist({ timeout: 5000 });

  return contextMenuIcon.click({ button: 'right' });
}