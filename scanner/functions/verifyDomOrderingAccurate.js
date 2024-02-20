function verifyDomOrderingAccurate(outerContainer, statusDisplays) {
  const containerNode = outerContainer.firstChild;
  const statusDisplayNodes = containerNode.childNodes;
  const orderedDomKeys = [];
  for (let i = 0; i < statusDisplayNodes.length; i++) {
    const contentKey = statusDisplayNodes[i].textContent;
    orderedDomKeys.push(contentKey);
  }

  const orderedLogicalKeys = [];
  let username;
  for (username in statusDisplays) {
    if (!statusDisplays.hasOwnProperty(username)) {
      continue;
    }
    const statusDisplay = statusDisplays[username];
    orderedLogicalKeys.push(statusDisplay.props.contentKey);
  }
  expect(orderedDomKeys).toEqual(orderedLogicalKeys);
}