function optimum_bandwidth(lh, bitrate) {
	        /**
	         * <PRE>
	         *  Input:
	         *      bitrate     total bitrate in kbps
	         *
	         *   Output:
	         *      lowerlimit: best lowpass frequency limit for input filter in Hz
	         *      upperlimit: best highpass frequency limit for input filter in Hz
	         * </PRE>
	         */
	        var freq_map = [new BandPass(8, 2000),
	            new BandPass(16, 3700), new BandPass(24, 3900),
	            new BandPass(32, 5500), new BandPass(40, 7000),
	            new BandPass(48, 7500), new BandPass(56, 10000),
	            new BandPass(64, 11000), new BandPass(80, 13500),
	            new BandPass(96, 15100), new BandPass(112, 15600),
	            new BandPass(128, 17000), new BandPass(160, 17500),
	            new BandPass(192, 18600), new BandPass(224, 19400),
	            new BandPass(256, 19700), new BandPass(320, 20500)];

	        var table_index = self.nearestBitrateFullIndex(bitrate);
	        lh.lowerlimit = freq_map[table_index].lowpass;
	    }