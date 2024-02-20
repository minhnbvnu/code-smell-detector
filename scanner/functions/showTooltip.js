function showTooltip(minLink, clientX, clientY) {
    const {fromId, toId} = minLink.link;
    bus.fire('show-tooltip', {
      isVisible: true,
      from: fromId, 
      to: toId, 
      x: clientX,
      y: clientY
    });

    removeHighlight();

    nodes.get(fromId).classList.add('hovered');
    nodes.get(toId).classList.add('hovered');
    minLink.ui.classList.add('hovered');
  }