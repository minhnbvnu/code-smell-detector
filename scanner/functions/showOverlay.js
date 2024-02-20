function showOverlay(elements, componentName, agent, hideAfterTimeout) {
  if (window.document == null) {
    if (elements != null && elements[0] != null) {
      agent.emit('showNativeHighlight', elements[0]);
    }

    return;
  }

  if (timeoutID !== null) {
    clearTimeout(timeoutID);
  }

  if (elements == null) {
    return;
  }

  if (overlay === null) {
    overlay = new Overlay_Overlay(agent);
  }

  overlay.inspect(elements, componentName);

  if (hideAfterTimeout) {
    timeoutID = setTimeout(() => hideOverlay(agent), SHOW_DURATION);
  }
}