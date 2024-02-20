function findNode(client, nodeType) {
  return client.$(`.Node[data-label="${nodeType}"]`);
}