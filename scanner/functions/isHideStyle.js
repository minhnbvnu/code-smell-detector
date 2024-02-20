function isHideStyle(node) {
    return getStyle(node, 'display') === 'none' || 
        getStyle(node, 'visibility') === 'hidden' || 
        getStyle(node, 'opacity') == 0 ||
        node.hidden;
  }