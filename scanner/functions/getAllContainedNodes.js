function getAllContainedNodes(range, condition) {
		if (typeof condition == "undefined") {
			condition = function () {
				return true;
			};
		}
		var node = range.startContainer;
		if (node.hasChildNodes() && range.startOffset < node.childNodes.length) {
			// A child is contained
			node = node.childNodes[range.startOffset];
		} else if (range.startOffset == getNodeLength(node)) {
			// No descendant can be contained
			node = nextNodeDescendants(node);
		} else {
			// No children; this node at least can't be contained
			node = nextNode(node);
		}

		var stop = range.endContainer;
		if (stop.hasChildNodes() && range.endOffset < stop.childNodes.length) {
			// The node after the last contained node is a child
			stop = stop.childNodes[range.endOffset];
		} else {
			// This node and/or some of its children might be contained
			stop = nextNodeDescendants(stop);
		}

		var nodeList = [];
		while (isBefore(node, stop)) {
			if (isContained(node, range) && condition(node)) {
				nodeList.push(node);
			}
			node = nextNode(node);
		}
		return nodeList;
	}