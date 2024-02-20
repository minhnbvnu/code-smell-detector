async function selectPatchInProjectBrowser(client, name) {
  const patch = await findPatchGroupItem(client, name);
  const selected = await hasClass('isSelected', patch);

  return selected ? Promise.resolve() : patch.click();
}