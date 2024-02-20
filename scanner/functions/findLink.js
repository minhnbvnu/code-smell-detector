function findLink(client, type) {
  return client.$(`.Link.${type}`);
}