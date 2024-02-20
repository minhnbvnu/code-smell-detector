function generateContainerNameFilter(containerName, inited) {
  if (inited) {
    return `{"name": ["${containerName}-inited"]}`;
  }
  return `{"name": ["${containerName}"]}`;
}