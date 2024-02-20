function getDescendants(node) {
		var descendants = [];
		var stop = nextNodeDescendants(node);
		while (null != (node = nextNode(node)) && node != stop) {
			descendants.push(node);
		}
		return descendants;
	}