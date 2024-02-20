async function renameContainer(container, name) {
  return await container.rename({
    name
  });
}