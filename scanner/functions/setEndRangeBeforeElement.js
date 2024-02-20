function setEndRangeBeforeElement(range, element) {
		range.setEndBefore(element);

		Aloha.getSelection().removeAllRanges();
		Aloha.getSelection().addRange(range);
	}