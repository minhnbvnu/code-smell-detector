function scrollToPatchInProjectBrowser(client, name) {
  return scrollTo(
    client,
    '.ProjectBrowser .inner-container',
    getSelectorForPatchInProjectBrowser(name)
  );
}