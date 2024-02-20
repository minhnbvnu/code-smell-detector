function stereo_demask(f) {
	        /* setup stereo demasking thresholds */
	        /* formula reverse enginerred from plot in paper */
	        var arg = freq2bark(f);
	        arg = (Math.min(arg, 15.5) / 15.5);

	        return Math.pow(10.0,
	            1.25 * (1 - Math.cos(Math.PI * arg)) - 2.5);
	    }