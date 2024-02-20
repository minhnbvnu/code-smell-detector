function compareNodes(node1, node2) {
    var cmp = node1.compareDocumentPosition(node2);
    if (cmp&window.document.DOCUMENT_POSITION_FOLLOWING) {
      return -1;
    } else if (cmp&window.document.DOCUMENT_POSITION_PRECEDING) {
      return 1;
    } else {
      return 0;
    }
  }