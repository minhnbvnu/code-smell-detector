function s3_func_x(bark, hf_slope) {
	        var tempx = bark, tempy;

	        if (tempx >= 0) {
	            tempy = -tempx * 27;
	        } else {
	            tempy = tempx * hf_slope;
	        }
	        if (tempy <= -72.0) {
	            return 0;
	        }
	        return Math.exp(tempy * LN_TO_LOG10);
	    }