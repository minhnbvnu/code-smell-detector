function setRangeFromRef(range, ref) {
		range.setStart(ref.startContainer, ref.startOffset);
		range.setEnd(ref.endContainer, ref.endOffset);
	}