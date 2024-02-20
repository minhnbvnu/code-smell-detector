function isTrimmable(node) {
    return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
  }