function correctFirefoxRangeIssue(rangeObject) {
		if (!rangeObject.isCollapsed() && rangeEndsInBeginningBlockElement(rangeObject)) {
			var blockElement = getBlockElement(rangeObject.endContainer);
			var range = Aloha.getSelection().getRangeAt(0);

			setEndRangeBeforeElement(range, blockElement);
		}
	}