function onMouseMove(e) {
    let link = findLinkInfoFromEvent(e);
    if (link) {
      showTooltip(link, e.clientX, e.clientY);
    } else {
      hideTooltip();
    }
  }