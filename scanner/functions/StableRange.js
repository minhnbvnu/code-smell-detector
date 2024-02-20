function StableRange(range) {
		if (!range) {
			return;
		}
		this.startContainer = range.startContainer;
		this.startOffset = range.startOffset;
		this.endContainer = range.endContainer;
		this.endOffset = range.endOffset;
		this.commonAncestorContainer = range.commonAncestorContainer;
		this.collapsed = range.collapsed;
	}