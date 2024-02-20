function getFirstLeaf(node) {
	  while (node.firstChild && (
	  // data-blocks has no offset
	  node.firstChild instanceof Element && node.firstChild.getAttribute('data-blocks') === 'true' || getSelectionOffsetKeyForNode(node.firstChild))) {
	    node = node.firstChild;
	  }
	  return node;
	}