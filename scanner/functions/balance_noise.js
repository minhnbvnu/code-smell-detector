function balance_noise(gfp, cod_info, distort, xrpow, bRefine) {
	        var gfc = gfp.internal_flags;

	        amp_scalefac_bands(gfp, cod_info, distort, xrpow, bRefine);

	        /*
	         * check to make sure we have not amplified too much loop_break returns
	         * 0 if there is an unamplified scalefac scale_bitcount returns 0 if no
	         * scalefactors are too large
	         */

	        var status = loop_break(cod_info);

	        if (status)
	            return false;
	        /* all bands amplified */

	        /*
	         * not all scalefactors have been amplified. so these scalefacs are
	         * possibly valid. encode them:
	         */
	        if (gfc.mode_gr == 2)
	            status = tk.scale_bitcount(cod_info);
	        else
	            status = tk.scale_bitcount_lsf(gfc, cod_info);

	        if (!status)
	            return true;
	        /* amplified some bands not exceeding limits */

	        /*
	         * some scalefactors are too large. lets try setting scalefac_scale=1
	         */
	        if (gfc.noise_shaping > 1) {
	            Arrays.fill(gfc.pseudohalf, 0);
	            if (0 == cod_info.scalefac_scale) {
	                inc_scalefac_scale(cod_info, xrpow);
	                status = false;
	            } else {
	                if (cod_info.block_type == Encoder.SHORT_TYPE
	                    && gfc.subblock_gain > 0) {
	                    status = (inc_subblock_gain(gfc, cod_info, xrpow) || loop_break(cod_info));
	                }
	            }
	        }

	        if (!status) {
	            if (gfc.mode_gr == 2)
	                status = tk.scale_bitcount(cod_info);
	            else
	                status = tk.scale_bitcount_lsf(gfc, cod_info);
	        }
	        return !status;
	    }