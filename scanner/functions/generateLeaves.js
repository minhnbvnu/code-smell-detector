function generateLeaves(characters, offset) {
	  var leaves = [];
	  var inlineStyles = characters.map(function (c) {
	    return c.getStyle();
	  }).toList();
	  findRangesImmutable(inlineStyles, areEqual, returnTrue, function (start, end) {
	    leaves.push(new LeafRange({
	      start: start + offset,
	      end: end + offset
	    }));
	  });
	  return List(leaves);
	}