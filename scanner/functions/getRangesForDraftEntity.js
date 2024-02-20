function getRangesForDraftEntity(block, key) {
	  var ranges = [];
	  block.findEntityRanges(function (c) {
	    return c.getEntity() === key;
	  }, function (start, end) {
	    ranges.push({ start: start, end: end });
	  });

	  !!!ranges.length ?  true ? invariant(false, 'Entity key not found in this range.') : invariant(false) : void 0;

	  return ranges;
	}