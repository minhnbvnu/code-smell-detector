function extendToWord(range) {
		var rangeObject = new RangeObject(range);
		Dom1.extendToWord(rangeObject);
		setRangeFromRef(range, rangeObject);
	}