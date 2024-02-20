function SmpFrqIndex(sample_freq, gpf) {
	        switch (sample_freq) {
	            case 44100:
	                gpf.version = 1;
	                return 0;
	            case 48000:
	                gpf.version = 1;
	                return 1;
	            case 32000:
	                gpf.version = 1;
	                return 2;
	            case 22050:
	                gpf.version = 0;
	                return 0;
	            case 24000:
	                gpf.version = 0;
	                return 1;
	            case 16000:
	                gpf.version = 0;
	                return 2;
	            case 11025:
	                gpf.version = 0;
	                return 0;
	            case 12000:
	                gpf.version = 0;
	                return 1;
	            case 8000:
	                gpf.version = 0;
	                return 2;
	            default:
	                gpf.version = 0;
	                return -1;
	        }
	    }