function highlightNode(nodeId) {
    removeClass('hovered');

    const mainNode = nodes.get(nodeId);
    makeHovered(mainNode);
    graph.forEachLinkedNode(nodeId, function(otherNode, link) {
      const ui = nodes.get(otherNode.id);
      ui.classList.add('hovered');
      moveToFront(ui);

      const linkInfo = linkAnimator.getLinkInfo(link.id);
      if (linkInfo) {
        const linkUI = linkInfo.ui;
        makeHovered(linkUI);
        moveToFront(linkUI);
      }
    });
    moveToFront(mainNode);
  }