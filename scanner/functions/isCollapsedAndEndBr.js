function isCollapsedAndEndBr(rangeObject) {
		if (rangeObject.startContainer !== rangeObject.endContainer) {
			return false;
		}
		if (rangeObject.startContainer.nodeType != 1) {
			return false;
		}
		return Engine.isEndBreak(rangeObject.startContainer);
	}