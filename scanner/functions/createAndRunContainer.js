async function createAndRunContainer(opts) {
  const container = await createContainer(opts);
  containers.add(container.id);
  await container.start({});
  return container;
}