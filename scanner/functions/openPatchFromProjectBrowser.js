async function openPatchFromProjectBrowser(client, name) {
  const patchInProjectBrowser = await client.$(
    getSelectorForPatchInProjectBrowser(name)
  );

  return patchInProjectBrowser.doubleClick();
}