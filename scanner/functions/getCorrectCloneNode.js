function getCorrectCloneNode(container, node) {
		var correctNode;

		if (node.nodeType === 3 && container.childNodes.length) {
			var index = getNodeIndex(node);

			if (index >= container.childNodes.length) {
				correctNode = container.lastChild;
			} else {
				correctNode = container.childNodes[index];
			}
		} else {
			correctNode = container;
		}

		return correctNode;
	}