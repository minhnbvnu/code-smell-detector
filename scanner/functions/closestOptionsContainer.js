function closestOptionsContainer(childNode, parentNode) {
  if (!childNode) return null;

  const { host } = childNode.getRootNode();
  if (!parentNode && host) return closestOptionsContainer(childNode, host);

  if (parentNode?.options) return parentNode;

  return closestOptionsContainer(parentNode, parentNode?.parentNode);
}