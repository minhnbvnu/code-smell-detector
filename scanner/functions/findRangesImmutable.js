function findRangesImmutable(haystack, areEqualFn, filterFn, foundFn) {
	  if (!haystack.size) {
	    return;
	  }

	  var cursor = 0;

	  haystack.reduce(function (value, nextValue, nextIndex) {
	    if (!areEqualFn(value, nextValue)) {
	      if (filterFn(value)) {
	        foundFn(cursor, nextIndex);
	      }
	      cursor = nextIndex;
	    }
	    return nextValue;
	  });

	  filterFn(haystack.last()) && foundFn(cursor, haystack.count());
	}