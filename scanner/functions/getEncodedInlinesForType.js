function getEncodedInlinesForType(block, styleList, styleToEncode) {
	  var ranges = [];

	  // Obtain an array with ranges for only the specified style.
	  var filteredInlines = styleList.map(function (style) {
	    return style.has(styleToEncode);
	  }).toList();

	  findRangesImmutable(filteredInlines, areEqual,
	  // We only want to keep ranges with nonzero style values.
	  isTruthy, function (start, end) {
	    var text = block.getText();
	    ranges.push({
	      offset: UnicodeUtils.strlen(text.slice(0, start)),
	      length: UnicodeUtils.strlen(text.slice(start, end)),
	      style: styleToEncode
	    });
	  });

	  return ranges;
	}