function lame_init_params_ppflt(gfp) {
	        var gfc = gfp.internal_flags;
	        /***************************************************************/
	        /* compute info needed for polyphase filter (filter type==0, default) */
	        /***************************************************************/

	        var lowpass_band = 32;
	        var highpass_band = -1;

	        if (gfc.lowpass1 > 0) {
	            var minband = 999;
	            for (var band = 0; band <= 31; band++) {
	                var freq = (band / 31.0);
	                /* this band and above will be zeroed: */
	                if (freq >= gfc.lowpass2) {
	                    lowpass_band = Math.min(lowpass_band, band);
	                }
	                if (gfc.lowpass1 < freq && freq < gfc.lowpass2) {
	                    minband = Math.min(minband, band);
	                }
	            }

	            /*
	             * compute the *actual* transition band implemented by the polyphase
	             * filter
	             */
	            if (minband == 999) {
	                gfc.lowpass1 = (lowpass_band - .75) / 31.0;
	            } else {
	                gfc.lowpass1 = (minband - .75) / 31.0;
	            }
	            gfc.lowpass2 = lowpass_band / 31.0;
	        }

	        /*
	         * make sure highpass filter is within 90% of what the effective
	         * highpass frequency will be
	         */
	        if (gfc.highpass2 > 0) {
	            if (gfc.highpass2 < .9 * (.75 / 31.0)) {
	                gfc.highpass1 = 0;
	                gfc.highpass2 = 0;
	                System.err.println("Warning: highpass filter disabled.  "
	                    + "highpass frequency too small\n");
	            }
	        }

	        if (gfc.highpass2 > 0) {
	            var maxband = -1;
	            for (var band = 0; band <= 31; band++) {
	                var freq = band / 31.0;
	                /* this band and below will be zereod */
	                if (freq <= gfc.highpass1) {
	                    highpass_band = Math.max(highpass_band, band);
	                }
	                if (gfc.highpass1 < freq && freq < gfc.highpass2) {
	                    maxband = Math.max(maxband, band);
	                }
	            }
	            /*
	             * compute the *actual* transition band implemented by the polyphase
	             * filter
	             */
	            gfc.highpass1 = highpass_band / 31.0;
	            if (maxband == -1) {
	                gfc.highpass2 = (highpass_band + .75) / 31.0;
	            } else {
	                gfc.highpass2 = (maxband + .75) / 31.0;
	            }
	        }

	        for (var band = 0; band < 32; band++) {
	            var fc1, fc2;
	            var freq = band / 31.0;
	            if (gfc.highpass2 > gfc.highpass1) {
	                fc1 = filter_coef((gfc.highpass2 - freq)
	                    / (gfc.highpass2 - gfc.highpass1 + 1e-20));
	            } else {
	                fc1 = 1.0;
	            }
	            if (gfc.lowpass2 > gfc.lowpass1) {
	                fc2 = filter_coef((freq - gfc.lowpass1)
	                    / (gfc.lowpass2 - gfc.lowpass1 + 1e-20));
	            } else {
	                fc2 = 1.0;
	            }
	            gfc.amp_filter[band] = (fc1 * fc2);
	        }
	    }