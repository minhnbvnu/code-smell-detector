function expandRange(range) {
		var cac = range.commonAncestorContainer;

		if (isInlineNode(cac)) {
			var parent = cac.parentNode;
			range.startContainer = parent;
			range.endContainer = parent;
			range.commonAncestorContainer = parent;
			range.startOffset = 0;
			range.endOffset = 1;
			expandRange(range);
			return;
		}

		// Because at this point there will be no further recursion, we should
		// finally update the state of `range`
		range.update();
	}