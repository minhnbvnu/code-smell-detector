function walkUntilNode(node, fn, untilNode, arg) {
		walkUntil(node, fn, function (nextNode) {
			return nextNode === untilNode;
		}, arg);
	}