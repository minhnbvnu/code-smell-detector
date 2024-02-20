function prepRangeForPaste(range) {
		if (rangeStartsAtProppedParagraph(range)) {
			if (3 === range.startContainer.nodeType) {
				range.startContainer.data = '';
			} else {
				range.startContainer.innerHTML = ' ';
			}
			range.startOffset = 0;

			// Because of situations like <p>[ ]</p> or <p>[<br/>]</p>
			if (range.endContainer === range.startContainer) {
				range.endOffset = 0;
			}
		}
	}