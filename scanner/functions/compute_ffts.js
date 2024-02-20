function compute_ffts(gfp, fftenergy, fftenergy_s, wsamp_l, wsamp_lPos, wsamp_s, wsamp_sPos, gr_out, chn, buffer, bufPos) {
	        var gfc = gfp.internal_flags;
	        if (chn < 2) {
	            fft.fft_long(gfc, wsamp_l[wsamp_lPos], chn, buffer, bufPos);
	            fft.fft_short(gfc, wsamp_s[wsamp_sPos], chn, buffer, bufPos);
	        }
	        /* FFT data for mid and side channel is derived from L & R */
	        else if (chn == 2) {
	            for (var j = Encoder.BLKSIZE - 1; j >= 0; --j) {
	                var l = wsamp_l[wsamp_lPos + 0][j];
	                var r = wsamp_l[wsamp_lPos + 1][j];
	                wsamp_l[wsamp_lPos + 0][j] = (l + r) * Util.SQRT2 * 0.5;
	                wsamp_l[wsamp_lPos + 1][j] = (l - r) * Util.SQRT2 * 0.5;
	            }
	            for (var b = 2; b >= 0; --b) {
	                for (var j = Encoder.BLKSIZE_s - 1; j >= 0; --j) {
	                    var l = wsamp_s[wsamp_sPos + 0][b][j];
	                    var r = wsamp_s[wsamp_sPos + 1][b][j];
	                    wsamp_s[wsamp_sPos + 0][b][j] = (l + r) * Util.SQRT2 * 0.5;
	                    wsamp_s[wsamp_sPos + 1][b][j] = (l - r) * Util.SQRT2 * 0.5;
	                }
	            }
	        }

	        /*********************************************************************
	         * compute energies
	         *********************************************************************/
	        fftenergy[0] = NON_LINEAR_SCALE_ENERGY(wsamp_l[wsamp_lPos + 0][0]);
	        fftenergy[0] *= fftenergy[0];

	        for (var j = Encoder.BLKSIZE / 2 - 1; j >= 0; --j) {
	            var re = (wsamp_l[wsamp_lPos + 0])[Encoder.BLKSIZE / 2 - j];
	            var im = (wsamp_l[wsamp_lPos + 0])[Encoder.BLKSIZE / 2 + j];
	            fftenergy[Encoder.BLKSIZE / 2 - j] = NON_LINEAR_SCALE_ENERGY((re
	                * re + im * im) * 0.5);
	        }
	        for (var b = 2; b >= 0; --b) {
	            fftenergy_s[b][0] = (wsamp_s[wsamp_sPos + 0])[b][0];
	            fftenergy_s[b][0] *= fftenergy_s[b][0];
	            for (var j = Encoder.BLKSIZE_s / 2 - 1; j >= 0; --j) {
	                var re = (wsamp_s[wsamp_sPos + 0])[b][Encoder.BLKSIZE_s
	                / 2 - j];
	                var im = (wsamp_s[wsamp_sPos + 0])[b][Encoder.BLKSIZE_s
	                / 2 + j];
	                fftenergy_s[b][Encoder.BLKSIZE_s / 2 - j] = NON_LINEAR_SCALE_ENERGY((re
	                    * re + im * im) * 0.5);
	            }
	        }
	        /* total energy */
	        {
	            var totalenergy = 0.0;
	            for (var j = 11; j < Encoder.HBLKSIZE; j++)
	                totalenergy += fftenergy[j];

	            gfc.tot_ener[chn] = totalenergy;
	        }

	        if (gfp.analysis) {
	            for (var j = 0; j < Encoder.HBLKSIZE; j++) {
	                gfc.pinfo.energy[gr_out][chn][j] = gfc.pinfo.energy_save[chn][j];
	                gfc.pinfo.energy_save[chn][j] = fftenergy[j];
	            }
	            gfc.pinfo.pe[gr_out][chn] = gfc.pe[chn];
	        }

	        /*********************************************************************
	         * compute loudness approximation (used for ATH auto-level adjustment)
	         *********************************************************************/
	        if (gfp.athaa_loudapprox == 2 && chn < 2) {
	            // no loudness for mid/side ch
	            gfc.loudness_sq[gr_out][chn] = gfc.loudness_sq_save[chn];
	            gfc.loudness_sq_save[chn] = psycho_loudness_approx(fftenergy, gfc);
	        }
	    }