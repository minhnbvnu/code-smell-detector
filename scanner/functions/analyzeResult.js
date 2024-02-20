function analyzeResult(Array, len) {
	        var i;

	        var elems = 0;
	        for (i = 0; i < len; i++)
	            elems += Array[i];
	        if (elems == 0)
	            return GAIN_NOT_ENOUGH_SAMPLES;

	        var upper = 0 | Math.ceil(elems * (1. - RMS_PERCENTILE));
	        for (i = len; i-- > 0;) {
	            if ((upper -= Array[i]) <= 0)
	                break;
	        }

	        //return (float) ((float) PINK_REF - (float) i / (float) STEPS_per_dB);
	        return (PINK_REF - i / GainAnalysis.STEPS_per_dB);
	    }