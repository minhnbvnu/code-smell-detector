function areRangesEq(a, b) {
		return a.startContainer === b.startContainer
			&& a.startOffset    === b.startOffset
			&& a.endContainer   === b.endContainer
			&& a.endOffset      === b.endOffset;
	}