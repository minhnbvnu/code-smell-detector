async function deletePatch(client, type) {
  // client.waitForVisible(getSelectorForPatchInProjectBrowser(type))

  await scrollToPatchInProjectBrowser(client, type);
  await clickDeletePatchButton(client, type);
  const projectBrowser = await findProjectBrowser(client);
  // TODO: why exactly do we search for in inside project browser?
  const popupConfirmButton = await projectBrowser.$(
    '.PopupConfirm button.Button--primary'
  );

  return popupConfirmButton.click();
}