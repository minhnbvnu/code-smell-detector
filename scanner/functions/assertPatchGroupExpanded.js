async function assertPatchGroupExpanded(client, groupTitle) {
  const patchGroup = await findPatchGroup(client, groupTitle);

  return assert.eventually.include(
    patchGroup.getAttribute('class'),
    'is-open',
    `Expected patch group "${groupTitle}" to be expanded, but it's collapsed`
  );
}