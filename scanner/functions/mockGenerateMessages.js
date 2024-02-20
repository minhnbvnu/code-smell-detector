async function* mockGenerateMessages(resourceIds) {
  const bundle = new FluentBundle(["en-US"]);
  const resource = new FluentResource("key1 = Key 1");
  bundle.addResource(resource);
  yield bundle;
}