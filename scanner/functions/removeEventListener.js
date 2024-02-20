function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}