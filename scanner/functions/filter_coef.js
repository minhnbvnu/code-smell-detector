function filter_coef(x) {
	        if (x > 1.0)
	            return 0.0;
	        if (x <= 0.0)
	            return 1.0;

	        return Math.cos(Math.PI / 2 * x);
	    }