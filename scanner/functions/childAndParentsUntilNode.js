function childAndParentsUntilNode(node, untilNode) {
		return childAndParentsUntil(node, function (nextNode) {
			return nextNode === untilNode;
		});
	}