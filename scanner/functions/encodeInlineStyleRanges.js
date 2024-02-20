function encodeInlineStyleRanges(block) {
	  var styleList = block.getCharacterList().map(function (c) {
	    return c.getStyle();
	  }).toList();
	  var ranges = styleList.flatten().toSet().map(function (style) {
	    return getEncodedInlinesForType(block, styleList, style);
	  });

	  return Array.prototype.concat.apply(EMPTY_ARRAY, ranges.toJS());
	}