function vbrpsy_compute_loudness_approximation_l(gfp, gr_out, chn, fftenergy) {
	        var gfc = gfp.internal_flags;
	        if (gfp.athaa_loudapprox == 2 && chn < 2) {
	            // no loudness for mid/side ch
	            gfc.loudness_sq[gr_out][chn] = gfc.loudness_sq_save[chn];
	            gfc.loudness_sq_save[chn] = psycho_loudness_approx(fftenergy, gfc);
	        }
	    }