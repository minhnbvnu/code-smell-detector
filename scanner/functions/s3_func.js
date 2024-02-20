function s3_func(bark) {
	        var tempx, x, tempy, temp;
	        tempx = bark;
	        if (tempx >= 0)
	            tempx *= 3;
	        else
	            tempx *= 1.5;

	        if (tempx >= 0.5 && tempx <= 2.5) {
	            temp = tempx - 0.5;
	            x = 8.0 * (temp * temp - 2.0 * temp);
	        } else
	            x = 0.0;
	        tempx += 0.474;
	        tempy = 15.811389 + 7.5 * tempx - 17.5
	            * Math.sqrt(1.0 + tempx * tempx);

	        if (tempy <= -60.0)
	            return 0.0;

	        tempx = Math.exp((x + tempy) * LN_TO_LOG10);

	        /**
	         * <PRE>
	         * Normalization.  The spreading function should be normalized so that:
	         * +inf
	         * /
	         * |  s3 [ bark ]  d(bark)   =  1
	         * /
	         * -inf
	         * </PRE>
	         */
	        tempx /= .6609193;
	        return tempx;
	    }