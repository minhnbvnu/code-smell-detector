function searchRange(ranges, value) {
	    // jshint bitwise: false
	    var range;
	    var imin = 0;
	    var imax = ranges.length - 1;
	    while (imin <= imax) {
	        var imid = (imin + imax) >>> 1;
	        range = ranges[imid];
	        var start = range.start;
	        if (start === value) {
	            return range;
	        } else if (start < value) {
	            imin = imid + 1;
	        } else { imax = imid - 1; }
	    }
	    if (imin > 0) {
	        range = ranges[imin - 1];
	        if (value > range.end) { return 0; }
	        return range;
	    }
	}