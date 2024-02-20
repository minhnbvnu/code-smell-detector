function isRealTemplate(node) {
    return isTemplate(node) && isFragment(node.content);
  }