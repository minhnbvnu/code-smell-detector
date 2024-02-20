function isCollapsedAndEmptyOrEndBr(rangeObject) {
		var firstChild;
		if (rangeObject.startContainer !== rangeObject.endContainer) {
			return false;
		}
		// check whether the container starts in an element node
		if (rangeObject.startContainer.nodeType != 1) {
			return false;
		}
		firstChild = rangeObject.startContainer.firstChild;
		return (!firstChild || (!firstChild.nextSibling && firstChild.nodeName == 'BR'));
	}