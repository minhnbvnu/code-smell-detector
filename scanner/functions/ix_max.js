function ix_max(ix, ixPos, endPos) {
	        var max1 = 0, max2 = 0;

	        do {
	            var x1 = ix[ixPos++];
	            var x2 = ix[ixPos++];
	            if (max1 < x1)
	                max1 = x1;

	            if (max2 < x2)
	                max2 = x2;
	        } while (ixPos < endPos);
	        if (max1 < max2)
	            max1 = max2;
	        return max1;
	    }