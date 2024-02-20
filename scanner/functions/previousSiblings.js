function previousSiblings(element) {
    return recursivelyCollect(element, 'previousSibling');
  }