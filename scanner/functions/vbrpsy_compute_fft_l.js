function vbrpsy_compute_fft_l(gfp, buffer, bufPos, chn, gr_out, fftenergy, wsamp_l, wsamp_lPos) {
	        var gfc = gfp.internal_flags;
	        if (chn < 2) {
	            fft.fft_long(gfc, wsamp_l[wsamp_lPos], chn, buffer, bufPos);
	        } else if (chn == 2) {
	            /* FFT data for mid and side channel is derived from L & R */
	            for (var j = Encoder.BLKSIZE - 1; j >= 0; --j) {
	                var l = wsamp_l[wsamp_lPos + 0][j];
	                var r = wsamp_l[wsamp_lPos + 1][j];
	                wsamp_l[wsamp_lPos + 0][j] = (l + r) * Util.SQRT2 * 0.5;
	                wsamp_l[wsamp_lPos + 1][j] = (l - r) * Util.SQRT2 * 0.5;
	            }
	        }

	        /*********************************************************************
	         * compute energies
	         *********************************************************************/
	        fftenergy[0] = NON_LINEAR_SCALE_ENERGY(wsamp_l[wsamp_lPos + 0][0]);
	        fftenergy[0] *= fftenergy[0];

	        for (var j = Encoder.BLKSIZE / 2 - 1; j >= 0; --j) {
	            var re = wsamp_l[wsamp_lPos + 0][Encoder.BLKSIZE / 2 - j];
	            var im = wsamp_l[wsamp_lPos + 0][Encoder.BLKSIZE / 2 + j];
	            fftenergy[Encoder.BLKSIZE / 2 - j] = NON_LINEAR_SCALE_ENERGY((re
	                * re + im * im) * 0.5);
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
	    }