function adjust_ATH(gfc) {
	        var gr2_max, max_pow;

	        if (gfc.ATH.useAdjust == 0) {
	            gfc.ATH.adjust = 1.0;
	            /* no adjustment */
	            return;
	        }

	        /* jd - 2001 mar 12, 27, jun 30 */
	        /* loudness based on equal loudness curve; */
	        /* use granule with maximum combined loudness */
	        max_pow = gfc.loudness_sq[0][0];
	        gr2_max = gfc.loudness_sq[1][0];
	        if (gfc.channels_out == 2) {
	            max_pow += gfc.loudness_sq[0][1];
	            gr2_max += gfc.loudness_sq[1][1];
	        } else {
	            max_pow += max_pow;
	            gr2_max += gr2_max;
	        }
	        if (gfc.mode_gr == 2) {
	            max_pow = Math.max(max_pow, gr2_max);
	        }
	        max_pow *= 0.5;
	        /* max_pow approaches 1.0 for full band noise */

	        /* jd - 2001 mar 31, jun 30 */
	        /* user tuning of ATH adjustment region */
	        max_pow *= gfc.ATH.aaSensitivityP;

	        /*
	         * adjust ATH depending on range of maximum value
	         */

	        /* jd - 2001 feb27, mar12,20, jun30, jul22 */
	        /* continuous curves based on approximation */
	        /* to GB's original values. */
	        /* For an increase in approximate loudness, */
	        /* set ATH adjust to adjust_limit immediately */
	        /* after a delay of one frame. */
	        /* For a loudness decrease, reduce ATH adjust */
	        /* towards adjust_limit gradually. */
	        /* max_pow is a loudness squared or a power. */
	        if (max_pow > 0.03125) { /* ((1 - 0.000625)/ 31.98) from curve below */
	            if (gfc.ATH.adjust >= 1.0) {
	                gfc.ATH.adjust = 1.0;
	            } else {
	                /* preceding frame has lower ATH adjust; */
	                /* ascend only to the preceding adjust_limit */
	                /* in case there is leading low volume */
	                if (gfc.ATH.adjust < gfc.ATH.adjustLimit) {
	                    gfc.ATH.adjust = gfc.ATH.adjustLimit;
	                }
	            }
	            gfc.ATH.adjustLimit = 1.0;
	        } else { /* adjustment curve */
	            /* about 32 dB maximum adjust (0.000625) */
	            var adj_lim_new = 31.98 * max_pow + 0.000625;
	            if (gfc.ATH.adjust >= adj_lim_new) { /* descend gradually */
	                gfc.ATH.adjust *= adj_lim_new * 0.075 + 0.925;
	                if (gfc.ATH.adjust < adj_lim_new) { /* stop descent */
	                    gfc.ATH.adjust = adj_lim_new;
	                }
	            } else { /* ascend */
	                if (gfc.ATH.adjustLimit >= adj_lim_new) {
	                    gfc.ATH.adjust = adj_lim_new;
	                } else {
	                    /* preceding frame has lower ATH adjust; */
	                    /* ascend only to the preceding adjust_limit */
	                    if (gfc.ATH.adjust < gfc.ATH.adjustLimit) {
	                        gfc.ATH.adjust = gfc.ATH.adjustLimit;
	                    }
	                }
	            }
	            gfc.ATH.adjustLimit = adj_lim_new;
	        }
	    }