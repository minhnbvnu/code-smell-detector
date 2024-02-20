function getAllEffectivelyContainedNodes(range, condition) {
		if (typeof condition == "undefined") {
			condition = function () {
				return true;
			};
		}
		var node = range.startContainer;
		while (isEffectivelyContained(node.parentNode, range)) {
			node = node.parentNode;
		}

		var stop = nextNodeDescendants(range.endContainer);

		var nodeList = [];
		while (isBefore(node, stop)) {
			if (isEffectivelyContained(node, range) && condition(node)) {
				nodeList.push(node);
			}
			node = nextNode(node);
		}
		return nodeList;
	}