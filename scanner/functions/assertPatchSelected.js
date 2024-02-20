function assertPatchSelected(client, name) {
  return assert.eventually.include(
    client
      .$(getSelectorForPatchInProjectBrowser(name))
      .then(el => el.getAttribute('class')),
    'isSelected'
  );
}