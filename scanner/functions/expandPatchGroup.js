async function expandPatchGroup(client, groupTitle) {
  const patchGroup = await findPatchGroup(client, groupTitle);
  const classList = await patchGroup.getAttribute('class');
  const isOpen = R.contains('is-open', classList);

  return isOpen ? Promise.resolve() : patchGroup.click();
}