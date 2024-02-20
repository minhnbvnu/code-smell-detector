function rangeEndsInBeginningBlockElement(rangeObejct) {
		var endContainer = rangeObejct.endContainer;
		var node = endContainer;

		var blockElement = getBlockElement(rangeObejct.endContainer);

		if (!isEndContainerAtBeginTexNode(rangeObejct)) {
			return false;
		}

		node = node.previousSibling || node.parentNode;

		while (node !== blockElement) {
			if (node.previousSibling) {
				node = node.previousSibling;
				if (Html.isRenderedNode(node)) {
					return false;
				}
			} else {
				node = node.parentNode;
			}
		}

		return node === blockElement;
	}