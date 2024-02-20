function findResourceByName(resources, resourceName) {
  for (const [name, res] of Object.entries(resources)) {
    if (name === resourceName) {
      return {
        resourceName,
        resourceRes: res
      };
    }
  }
  return;
}