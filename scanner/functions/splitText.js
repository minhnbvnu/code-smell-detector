function splitText(node, index) {
		var newNode = node.cloneNode(false);
		newNode.deleteData(0, index);
		node.deleteData(index, node.length - index);
		insertAfter(newNode, node);
		return newNode;
	}