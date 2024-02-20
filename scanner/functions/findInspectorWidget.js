function findInspectorWidget(client, name) {
  return client.$(`.Widget[title=${name}] input`);
}