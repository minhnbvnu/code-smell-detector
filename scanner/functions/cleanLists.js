function cleanLists(node, range) {
		// remove any whitespace nodes around list nodes
		if (node) {
			jQuery(node).find('ul,ol,li').each(function () {
				jQuery(this).contents().each(function () {
					if (isListWhitespaceToRemove(this)) {
						var index = Dom.getIndexInParent(this);

						// if the range points to somewhere behind the removed text node, we reduce the offset
						if (range.startContainer === this.parentNode && range.startOffset > index) {
							range.startOffset--;
						} else if (range.startContainer === this) {
							// the range starts in the removed text node, let it start right before
							range.startContainer = this.parentNode;
							range.startOffset = index;
						}
						// same thing for end of the range
						if (range.endContainer === this.parentNode && range.endOffset > index) {
							range.endOffset--;
						} else if (range.endContainer === this) {
							range.endContainer = this.parentNode;
							range.endOffset = index;
						}
						// finally remove the whitespace node
						jQuery(this).remove();
					}
				});
			});
		}
	}