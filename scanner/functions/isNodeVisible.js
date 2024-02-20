async function isNodeVisible(client, nodeType) {
  const node = await client.$(`.Node[data-label="${nodeType}"]`);
  return node.isDisplayed();
}