function isEndContainerAtBeginTexNode(rangeObject) {
		var endContainer = rangeObject.endContainer;
		var endOffset = rangeObject.endOffset;
		var i;

		if (!Dom2.isTextNode(endContainer)) {
			return false;
		}

		for (i = endOffset - 1; i >= 0; i--) {
			if (jQuery.trim(endContainer.textContent[i]).length !== 0) {
				return false;
			}
		}

		return true;
	}