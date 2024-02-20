async function clickDeletePatchButton(client, name) {
  await openProjectBrowserPatchContextMenu(client, name);

  const contextMenu = await findProjectBrowserPatchContextMenu(client);
  const contextMenuItem = await contextMenu.$(
    '.react-contextmenu-item[data-id="delete"]'
  );

  return contextMenuItem.click();
}