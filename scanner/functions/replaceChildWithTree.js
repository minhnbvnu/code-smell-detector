function replaceChildWithTree(oldNode, newTree) {
	  oldNode.parentNode.replaceChild(newTree.node, oldNode);
	  insertTreeChildren(newTree);
	}