function decodeEntityRanges(text, ranges) {
	  var entities = Array(text.length).fill(null);
	  if (ranges) {
	    ranges.forEach(function (range) {
	      // Using Unicode-enabled substrings converted to JavaScript lengths,
	      // fill the output array with entity keys.
	      var start = substr(text, 0, range.offset).length;
	      var end = start + substr(text, range.offset, range.length).length;
	      for (var ii = start; ii < end; ii++) {
	        entities[ii] = range.key;
	      }
	    });
	  }
	  return entities;
	}