function getDomNodesAboveFold(fold) {
  let currentNode = fold;
  const criticalNodes = [];

  while (currentNode) {
    if (currentNode.nodeType === 1) {
      criticalNodes.push(currentNode);
    }

    if (currentNode.tagName === 'BODY') {
      criticalNodes.push(currentNode.parentNode); // Lets get the <html> node in there as well
      break;
    }

    if (currentNode.previousSibling) {
      // Collect all child nodes of previous siblings
      if (currentNode.previousSibling.nodeType === 1) {
        criticalNodes.push(
          ...currentNode.previousSibling.querySelectorAll('*')
        );
      }

      currentNode = currentNode.previousSibling;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return criticalNodes;
}