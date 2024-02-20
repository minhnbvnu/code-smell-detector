function getNearestEditingHost(range) {
		var editable = DomUtils.getEditingHostOf(range.startContainer);
		if (editable) {
			return editable;
		}
		var copy = Dom.stableRange(range);
		var isNotEditingHost = Fn.complement(Dom.isEditingHost);
		Dom.trimRange(copy, isNotEditingHost, isNotEditingHost);
		return Dom.getEditingHostOf(
			Dom.nodeAtOffset(copy.startContainer, copy.startOffset)
		);
	}