function dispatchEventOnNode(node, type) {
    node.dispatchEvent(new Event(type, {bubbles: true, cancelable: true}));
  }