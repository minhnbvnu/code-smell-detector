function ResetSampleFrequency(rgData, samplefreq) {
	        /* zero out initial values */
	        for (var i = 0; i < MAX_ORDER; i++)
	            rgData.linprebuf[i] = rgData.lstepbuf[i] = rgData.loutbuf[i] = rgData.rinprebuf[i] = rgData.rstepbuf[i] = rgData.routbuf[i] = 0.;

	        switch (0 | (samplefreq)) {
	            case 48000:
	                rgData.reqindex = 0;
	                break;
	            case 44100:
	                rgData.reqindex = 1;
	                break;
	            case 32000:
	                rgData.reqindex = 2;
	                break;
	            case 24000:
	                rgData.reqindex = 3;
	                break;
	            case 22050:
	                rgData.reqindex = 4;
	                break;
	            case 16000:
	                rgData.reqindex = 5;
	                break;
	            case 12000:
	                rgData.reqindex = 6;
	                break;
	            case 11025:
	                rgData.reqindex = 7;
	                break;
	            case 8000:
	                rgData.reqindex = 8;
	                break;
	            default:
	                return INIT_GAIN_ANALYSIS_ERROR;
	        }

	        rgData.sampleWindow = 0 | ((samplefreq * RMS_WINDOW_TIME_NUMERATOR
	            + RMS_WINDOW_TIME_DENOMINATOR - 1) / RMS_WINDOW_TIME_DENOMINATOR);

	        rgData.lsum = 0.;
	        rgData.rsum = 0.;
	        rgData.totsamp = 0;

	        Arrays.ill(rgData.A, 0);

	        return INIT_GAIN_ANALYSIS_OK;
	    }