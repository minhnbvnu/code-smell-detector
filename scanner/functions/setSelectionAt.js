function setSelectionAt(range) {
		var newRange = Aloha.createRange();
		var selection = Aloha.getSelection();
		newRange.setStart(range.startContainer, range.startOffset);
		newRange.setEnd(range.endContainer, range.endOffset);
		selection.removeAllRanges();
		selection.addRange(newRange);
	}