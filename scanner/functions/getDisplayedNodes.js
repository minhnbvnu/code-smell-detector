function getDisplayedNodes(rootNode, selector) {
  if (!rootNode || !selector || !isHTMLElement(rootNode)) {
    return;
  }

  const nodes = Array.from(rootNode.querySelectorAll(selector)); // offsetParent will be null if the element isn't currently displayed,
  // so this will allow us to operate only on visible nodes

  return nodes.filter(node => node.offsetParent !== null);
}