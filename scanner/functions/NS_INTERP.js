function NS_INTERP(x, y, r) {
	        /* was pow((x),(r))*pow((y),1-(r)) */
	        if (r >= 1.0) {
	            /* 99.7% of the time */
	            return x;
	        }
	        if (r <= 0.0)
	            return y;
	        if (y > 0.0) {
	            /* rest of the time */
	            return (Math.pow(x / y, r) * y);
	        }
	        /* never happens */
	        return 0.0;
	    }