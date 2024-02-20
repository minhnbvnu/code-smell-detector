function all_scalefactors_not_negative(scalefac, n) {
	        for (var i = 0; i < n; ++i) {
	            if (scalefac[i] < 0)
	                return false;
	        }
	        return true;
	    }