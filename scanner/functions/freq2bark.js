function freq2bark(freq) {
	        /* input: freq in hz output: barks */
	        if (freq < 0)
	            freq = 0;
	        freq = freq * 0.001;
	        return 13.0 * Math.atan(.76 * freq) + 3.5
	            * Math.atan(freq * freq / (7.5 * 7.5));
	    }