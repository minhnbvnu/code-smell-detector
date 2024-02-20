async function clickAddNodeButton(client, name) {
  await openProjectBrowserPatchContextMenu(client, name);

  const contextMenu = await findProjectBrowserPatchContextMenu(client);
  const placeMenuItem = await contextMenu.$(
    '.react-contextmenu-item[data-id="place"]'
  );

  return placeMenuItem.click();
}