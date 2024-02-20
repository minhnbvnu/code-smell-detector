function moveOverZWSP(range, forward) {
		var offset;
		if (!range.collapsed) {
			return;
		}

		offset = range.startOffset;

		if (forward) {
			// check whether the range starts in a text node
			if (range.startContainer && range.startContainer.nodeType === $_.Node.TEXT_NODE) {
				// move forward (i.e. increase offset) as long as we stay in the text node and have zwsp characters to the right
				while (offset < range.startContainer.data.length && range.startContainer.data.charAt(offset) === '\u200b') {
					offset++;
				}
			}
		} else {
			// check whether the range starts in a text node
			if (range.startContainer && range.startContainer.nodeType === $_.Node.TEXT_NODE) {
				// move backward (i.e. decrease offset) as long as we stay in the text node and have zwsp characters to the left
				while (offset > 0 && range.startContainer.data.charAt(offset - 1) === '\u200b') {
					offset--;
				}
			}
		}

		// if the offset was changed, set it back to the collapsed range
		if (offset !== range.startOffset) {
			range.setStart(range.startContainer, offset);
			range.setEnd(range.startContainer, offset);
		}
	}