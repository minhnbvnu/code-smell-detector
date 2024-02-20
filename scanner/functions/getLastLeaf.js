function getLastLeaf(node) {
	  while (node.lastChild && (
	  // data-blocks has no offset
	  node.lastChild instanceof Element && node.lastChild.getAttribute('data-blocks') === 'true' || getSelectionOffsetKeyForNode(node.lastChild))) {
	    node = node.lastChild;
	  }
	  return node;
	}