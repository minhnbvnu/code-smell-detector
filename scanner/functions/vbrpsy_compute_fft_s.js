function vbrpsy_compute_fft_s(gfp, buffer, bufPos, chn, sblock, fftenergy_s, wsamp_s, wsamp_sPos) {
	        var gfc = gfp.internal_flags;

	        if (sblock == 0 && chn < 2) {
	            fft.fft_short(gfc, wsamp_s[wsamp_sPos], chn, buffer, bufPos);
	        }
	        if (chn == 2) {
	            /* FFT data for mid and side channel is derived from L & R */
	            for (var j = Encoder.BLKSIZE_s - 1; j >= 0; --j) {
	                var l = wsamp_s[wsamp_sPos + 0][sblock][j];
	                var r = wsamp_s[wsamp_sPos + 1][sblock][j];
	                wsamp_s[wsamp_sPos + 0][sblock][j] = (l + r) * Util.SQRT2 * 0.5;
	                wsamp_s[wsamp_sPos + 1][sblock][j] = (l - r) * Util.SQRT2 * 0.5;
	            }
	        }

	        /*********************************************************************
	         * compute energies
	         *********************************************************************/
	        fftenergy_s[sblock][0] = wsamp_s[wsamp_sPos + 0][sblock][0];
	        fftenergy_s[sblock][0] *= fftenergy_s[sblock][0];
	        for (var j = Encoder.BLKSIZE_s / 2 - 1; j >= 0; --j) {
	            var re = wsamp_s[wsamp_sPos + 0][sblock][Encoder.BLKSIZE_s / 2 - j];
	            var im = wsamp_s[wsamp_sPos + 0][sblock][Encoder.BLKSIZE_s / 2 + j];
	            fftenergy_s[sblock][Encoder.BLKSIZE_s / 2 - j] = NON_LINEAR_SCALE_ENERGY((re
	                * re + im * im) * 0.5);
	        }
	    }