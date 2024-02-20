function getDocumentOrShadowRoot(node) {
  const rootNode = node?.getRootNode?.();
  if (rootNode instanceof ShadowRoot || rootNode instanceof Document) {
    return rootNode;
  }
  return null;
}