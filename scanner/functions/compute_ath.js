function compute_ath(gfp) {
	        var ATH_l = gfp.internal_flags.ATH.l;
	        var ATH_psfb21 = gfp.internal_flags.ATH.psfb21;
	        var ATH_s = gfp.internal_flags.ATH.s;
	        var ATH_psfb12 = gfp.internal_flags.ATH.psfb12;
	        var gfc = gfp.internal_flags;
	        var samp_freq = gfp.out_samplerate;

	        for (var sfb = 0; sfb < Encoder.SBMAX_l; sfb++) {
	            var start = gfc.scalefac_band.l[sfb];
	            var end = gfc.scalefac_band.l[sfb + 1];
	            ATH_l[sfb] = Float.MAX_VALUE;
	            for (var i = start; i < end; i++) {
	                var freq = i * samp_freq / (2 * 576);
	                var ATH_f = ATHmdct(gfp, freq);
	                /* freq in kHz */
	                ATH_l[sfb] = Math.min(ATH_l[sfb], ATH_f);
	            }
	        }

	        for (var sfb = 0; sfb < Encoder.PSFB21; sfb++) {
	            var start = gfc.scalefac_band.psfb21[sfb];
	            var end = gfc.scalefac_band.psfb21[sfb + 1];
	            ATH_psfb21[sfb] = Float.MAX_VALUE;
	            for (var i = start; i < end; i++) {
	                var freq = i * samp_freq / (2 * 576);
	                var ATH_f = ATHmdct(gfp, freq);
	                /* freq in kHz */
	                ATH_psfb21[sfb] = Math.min(ATH_psfb21[sfb], ATH_f);
	            }
	        }

	        for (var sfb = 0; sfb < Encoder.SBMAX_s; sfb++) {
	            var start = gfc.scalefac_band.s[sfb];
	            var end = gfc.scalefac_band.s[sfb + 1];
	            ATH_s[sfb] = Float.MAX_VALUE;
	            for (var i = start; i < end; i++) {
	                var freq = i * samp_freq / (2 * 192);
	                var ATH_f = ATHmdct(gfp, freq);
	                /* freq in kHz */
	                ATH_s[sfb] = Math.min(ATH_s[sfb], ATH_f);
	            }
	            ATH_s[sfb] *= (gfc.scalefac_band.s[sfb + 1] - gfc.scalefac_band.s[sfb]);
	        }

	        for (var sfb = 0; sfb < Encoder.PSFB12; sfb++) {
	            var start = gfc.scalefac_band.psfb12[sfb];
	            var end = gfc.scalefac_band.psfb12[sfb + 1];
	            ATH_psfb12[sfb] = Float.MAX_VALUE;
	            for (var i = start; i < end; i++) {
	                var freq = i * samp_freq / (2 * 192);
	                var ATH_f = ATHmdct(gfp, freq);
	                /* freq in kHz */
	                ATH_psfb12[sfb] = Math.min(ATH_psfb12[sfb], ATH_f);
	            }
	            /* not sure about the following */
	            ATH_psfb12[sfb] *= (gfc.scalefac_band.s[13] - gfc.scalefac_band.s[12]);
	        }

	        /*
	         * no-ATH mode: reduce ATH to -200 dB
	         */
	        if (gfp.noATH) {
	            for (var sfb = 0; sfb < Encoder.SBMAX_l; sfb++) {
	                ATH_l[sfb] = 1E-20;
	            }
	            for (var sfb = 0; sfb < Encoder.PSFB21; sfb++) {
	                ATH_psfb21[sfb] = 1E-20;
	            }
	            for (var sfb = 0; sfb < Encoder.SBMAX_s; sfb++) {
	                ATH_s[sfb] = 1E-20;
	            }
	            for (var sfb = 0; sfb < Encoder.PSFB12; sfb++) {
	                ATH_psfb12[sfb] = 1E-20;
	            }
	        }

	        /*
	         * work in progress, don't rely on it too much
	         */
	        gfc.ATH.floor = 10. * Math.log10(ATHmdct(gfp, -1.));
	    }