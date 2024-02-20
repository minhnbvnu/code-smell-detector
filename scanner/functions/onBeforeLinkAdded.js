function onBeforeLinkAdded(linkInfo) {
    let { link, ui } = linkInfo;
    if (link.fromId === graph.rootId || link.toId === graph.rootId) {
      makeHovered(ui);
      let toUI = nodeContainer.querySelector('#node-' + link.toId);
      makeHovered(toUI);

      let fromUI = nodeContainer.querySelector('#node-' + link.fromId);
      makeHovered(fromUI);
    }
  }