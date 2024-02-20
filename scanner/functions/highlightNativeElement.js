function highlightNativeElement({
    displayName,
    hideAfterTimeout,
    id,
    openNativeElementsPanel,
    rendererID,
    scrollIntoView
  }) {
    const renderer = agent.rendererInterfaces[rendererID];

    if (renderer == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    }

    let nodes = null;

    if (renderer != null) {
      nodes = renderer.findNativeNodesForFiberID(id);
    }

    if (nodes != null && nodes[0] != null) {
      const node = nodes[0]; // $FlowFixMe[method-unbinding]

      if (scrollIntoView && typeof node.scrollIntoView === 'function') {
        // If the node isn't visible show it before highlighting it.
        // We may want to reconsider this; it might be a little disruptive.
        node.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
      }

      showOverlay(nodes, displayName, agent, hideAfterTimeout);

      if (openNativeElementsPanel) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0 = node;
        bridge.send('syncSelectionToNativeElementsPanel');
      }
    } else {
      hideOverlay(agent);
    }
  }