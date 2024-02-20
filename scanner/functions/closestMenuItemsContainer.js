function closestMenuItemsContainer(childNode, parentNode) {
  if (!childNode) return null;

  const { host } = childNode.getRootNode();
  if (!parentNode && host) return closestMenuItemsContainer(childNode, host);

  if (parentNode?.items) return parentNode;

  return closestMenuItemsContainer(parentNode, parentNode?.parentNode);
}