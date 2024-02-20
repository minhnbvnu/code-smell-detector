function rangeFromRangeObject(alohaRange) {
		var range = Aloha.createRange();
		range.setStart(alohaRange.startContainer, alohaRange.startOffset);
		range.setEnd(alohaRange.endContainer, alohaRange.endOffset);
		return range;
	}