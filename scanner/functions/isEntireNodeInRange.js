function isEntireNodeInRange(range) {
		var sc = range.startContainer;
		var	so = range.startOffset;
		var	ec = range.endContainer;
		var	eo = range.endOffset;
		return (sc === ec && so === 0 && eo === ec.length);
	}