function onMouseClick(e) {
    const clickTarget = e.target;
    if (!nodeContainer.contains(clickTarget)) return;

    let nodeId = getNodeIdFromUI(clickTarget);
    bus.fire('show-subreddit', nodeId);

    highlightNode(nodeId);
  }