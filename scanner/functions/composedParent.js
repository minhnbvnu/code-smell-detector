function composedParent(element) {
  const parentNode = element.parentElement;

  if (parentNode) {
    return parentNode;
  } else {
    const rootNode = element.getRootNode();

    if (rootNode.host instanceof HTMLElement) {
      // this is shadow-root
      return rootNode.host;
    }
  }

  return null;
}