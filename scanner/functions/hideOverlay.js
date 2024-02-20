function hideOverlay(agent) {
  if (window.document == null) {
    agent.emit('hideNativeHighlight');
    return;
  }

  timeoutID = null;

  if (overlay !== null) {
    overlay.remove();
    overlay = null;
  }
}