function optimum_samplefreq(lowpassfreq, input_samplefreq) {
	        /*
	         * Rules:
	         *
	         * - if possible, sfb21 should NOT be used
	         */
	        var suggested_samplefreq = 44100;

	        if (input_samplefreq >= 48000)
	            suggested_samplefreq = 48000;
	        else if (input_samplefreq >= 44100)
	            suggested_samplefreq = 44100;
	        else if (input_samplefreq >= 32000)
	            suggested_samplefreq = 32000;
	        else if (input_samplefreq >= 24000)
	            suggested_samplefreq = 24000;
	        else if (input_samplefreq >= 22050)
	            suggested_samplefreq = 22050;
	        else if (input_samplefreq >= 16000)
	            suggested_samplefreq = 16000;
	        else if (input_samplefreq >= 12000)
	            suggested_samplefreq = 12000;
	        else if (input_samplefreq >= 11025)
	            suggested_samplefreq = 11025;
	        else if (input_samplefreq >= 8000)
	            suggested_samplefreq = 8000;

	        if (lowpassfreq == -1)
	            return suggested_samplefreq;

	        if (lowpassfreq <= 15960)
	            suggested_samplefreq = 44100;
	        if (lowpassfreq <= 15250)
	            suggested_samplefreq = 32000;
	        if (lowpassfreq <= 11220)
	            suggested_samplefreq = 24000;
	        if (lowpassfreq <= 9970)
	            suggested_samplefreq = 22050;
	        if (lowpassfreq <= 7230)
	            suggested_samplefreq = 16000;
	        if (lowpassfreq <= 5420)
	            suggested_samplefreq = 12000;
	        if (lowpassfreq <= 4510)
	            suggested_samplefreq = 11025;
	        if (lowpassfreq <= 3970)
	            suggested_samplefreq = 8000;

	        if (input_samplefreq < suggested_samplefreq) {
	            /*
	             * choose a valid MPEG sample frequency above the input sample
	             * frequency to avoid SFB21/12 bitrate bloat rh 061115
	             */
	            if (input_samplefreq > 44100) {
	                return 48000;
	            }
	            if (input_samplefreq > 32000) {
	                return 44100;
	            }
	            if (input_samplefreq > 24000) {
	                return 32000;
	            }
	            if (input_samplefreq > 22050) {
	                return 24000;
	            }
	            if (input_samplefreq > 16000) {
	                return 22050;
	            }
	            if (input_samplefreq > 12000) {
	                return 16000;
	            }
	            if (input_samplefreq > 11025) {
	                return 12000;
	            }
	            if (input_samplefreq > 8000) {
	                return 11025;
	            }
	            return 8000;
	        }
	        return suggested_samplefreq;
	    }