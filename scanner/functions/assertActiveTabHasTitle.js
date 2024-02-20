async function assertActiveTabHasTitle(client, expectedTitle) {
  const tab = await client.$('.TabsContainer .TabsItem.is-active .tab-name');
  return assert.eventually.strictEqual(tab.getText(), expectedTitle);
}