async function assertPatchGroupCollapsed(client, groupTitle) {
  const patchGroup = await findPatchGroup(client, groupTitle);

  return assert.eventually.include(
    patchGroup.getAttribute('class'),
    'is-closed',
    `Expected patch group "${groupTitle}" to be collapsed, but it's expanded`
  );
}