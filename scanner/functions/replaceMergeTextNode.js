function replaceMergeTextNode(node, text) {
		node.deleteData(0, node.length);
		if ('' !== text) {
			if (node.nextSibling && 3 === node.nextSibling.nodeType) {
				node.nextSibling.insertData(0, text);
			} else if (node.previousSibling && 3 === node.previousSibling.nodeType) {
				node.previousSibling.insertData(node.previousSibling.length, text);
			} else {
				node.insertData(0, text);
			}
		}
		// We don't remove the node immediately to avoid intefering with a
		// caller's range object that may have a start or end containers
		// equal to this node. Removing it in a timeout may still interfere
		// with the selection, but that was not a problem during testing.
		setTimeout(function () {
			if (0 === node.length) {
				$(node).remove();
			}
		}, 0);
	}