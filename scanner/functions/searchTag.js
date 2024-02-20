function searchTag(arr, tag) {
	    /* jshint bitwise: false */
	    var imin = 0;
	    var imax = arr.length - 1;
	    while (imin <= imax) {
	        var imid = (imin + imax) >>> 1;
	        var val = arr[imid].tag;
	        if (val === tag) {
	            return imid;
	        } else if (val < tag) {
	            imin = imid + 1;
	        } else { imax = imid - 1; }
	    }
	    // Not found: return -1-insertion point
	    return -imin - 1;
	}