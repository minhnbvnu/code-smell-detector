function setActiveRange(range) {
		var rangeObject = new window.GENTICS.Utils.RangeObject();

		rangeObject.startContainer = range.startContainer;
		rangeObject.startOffset = range.startOffset;
		rangeObject.endContainer = range.endContainer;
		rangeObject.endOffset = range.endOffset;

		rangeObject.correctRange();
		rangeObject.select();
	}