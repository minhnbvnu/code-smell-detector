function apply_abr_preset(gfp, preset, enforce) {
	        /* Variables for the ABR stuff */
	        var actual_bitrate = preset;

	        var r = lame.nearestBitrateFullIndex(preset);

	        gfp.VBR = VbrMode.vbr_abr;
	        gfp.VBR_mean_bitrate_kbps = actual_bitrate;
	        gfp.VBR_mean_bitrate_kbps = Math.min(gfp.VBR_mean_bitrate_kbps, 320);
	        gfp.VBR_mean_bitrate_kbps = Math.max(gfp.VBR_mean_bitrate_kbps, 8);
	        gfp.brate = gfp.VBR_mean_bitrate_kbps;
	        if (gfp.VBR_mean_bitrate_kbps > 320) {
	            gfp.disable_reservoir = true;
	        }

	        /* parameters for which there is no proper set/get interface */
	        if (abr_switch_map[r].safejoint > 0)
	            gfp.exp_nspsytune = gfp.exp_nspsytune | 2;
	        /* safejoint */

	        if (abr_switch_map[r].sfscale > 0) {
	            gfp.internal_flags.noise_shaping = 2;
	        }
	        /* ns-bass tweaks */
	        if (Math.abs(abr_switch_map[r].nsbass) > 0) {
	            var k = (int)(abr_switch_map[r].nsbass * 4);
	            if (k < 0)
	                k += 64;
	            gfp.exp_nspsytune = gfp.exp_nspsytune | (k << 2);
	        }

	        if (enforce != 0)
	            gfp.quant_comp = abr_switch_map[r].quant_comp;
	        else if (!(Math.abs(gfp.quant_comp - -1) > 0))
	            gfp.quant_comp = abr_switch_map[r].quant_comp;
	        // SET_OPTION(quant_comp, abr_switch_map[r].quant_comp, -1);
	        if (enforce != 0)
	            gfp.quant_comp_short = abr_switch_map[r].quant_comp_s;
	        else if (!(Math.abs(gfp.quant_comp_short - -1) > 0))
	            gfp.quant_comp_short = abr_switch_map[r].quant_comp_s;
	        // SET_OPTION(quant_comp_short, abr_switch_map[r].quant_comp_s, -1);

	        if (enforce != 0)
	            gfp.msfix = abr_switch_map[r].nsmsfix;
	        else if (!(Math.abs(gfp.msfix - -1) > 0))
	            gfp.msfix = abr_switch_map[r].nsmsfix;
	        // SET_OPTION(msfix, abr_switch_map[r].nsmsfix, -1);

	        if (enforce != 0)
	            gfp.internal_flags.nsPsy.attackthre = abr_switch_map[r].st_lrm;
	        else if (!(Math.abs(gfp.internal_flags.nsPsy.attackthre - -1) > 0))
	            gfp.internal_flags.nsPsy.attackthre = abr_switch_map[r].st_lrm;
	        // SET_OPTION(short_threshold_lrm, abr_switch_map[r].st_lrm, -1);
	        if (enforce != 0)
	            gfp.internal_flags.nsPsy.attackthre_s = abr_switch_map[r].st_s;
	        else if (!(Math.abs(gfp.internal_flags.nsPsy.attackthre_s - -1) > 0))
	            gfp.internal_flags.nsPsy.attackthre_s = abr_switch_map[r].st_s;
	        // SET_OPTION(short_threshold_s, abr_switch_map[r].st_s, -1);

	        /*
	         * ABR seems to have big problems with clipping, especially at low
	         * bitrates
	         */
	        /*
	         * so we compensate for that here by using a scale value depending on
	         * bitrate
	         */
	        if (enforce != 0)
	            gfp.scale = abr_switch_map[r].scale;
	        else if (!(Math.abs(gfp.scale - -1) > 0))
	            gfp.scale = abr_switch_map[r].scale;
	        // SET_OPTION(scale, abr_switch_map[r].scale, -1);

	        if (enforce != 0)
	            gfp.maskingadjust = abr_switch_map[r].masking_adj;
	        else if (!(Math.abs(gfp.maskingadjust - 0) > 0))
	            gfp.maskingadjust = abr_switch_map[r].masking_adj;
	        // SET_OPTION(maskingadjust, abr_switch_map[r].masking_adj, 0);
	        if (abr_switch_map[r].masking_adj > 0) {
	            if (enforce != 0)
	                gfp.maskingadjust_short = (abr_switch_map[r].masking_adj * .9);
	            else if (!(Math.abs(gfp.maskingadjust_short - 0) > 0))
	                gfp.maskingadjust_short = (abr_switch_map[r].masking_adj * .9);
	            // SET_OPTION(maskingadjust_short, abr_switch_map[r].masking_adj *
	            // .9, 0);
	        } else {
	            if (enforce != 0)
	                gfp.maskingadjust_short = (abr_switch_map[r].masking_adj * 1.1);
	            else if (!(Math.abs(gfp.maskingadjust_short - 0) > 0))
	                gfp.maskingadjust_short = (abr_switch_map[r].masking_adj * 1.1);
	            // SET_OPTION(maskingadjust_short, abr_switch_map[r].masking_adj *
	            // 1.1, 0);
	        }

	        if (enforce != 0)
	            gfp.ATHlower = -abr_switch_map[r].ath_lower / 10.;
	        else if (!(Math.abs((-gfp.ATHlower * 10.) - 0) > 0))
	            gfp.ATHlower = -abr_switch_map[r].ath_lower / 10.;
	        // SET_OPTION(ATHlower, abr_switch_map[r].ath_lower, 0);
	        if (enforce != 0)
	            gfp.ATHcurve = abr_switch_map[r].ath_curve;
	        else if (!(Math.abs(gfp.ATHcurve - -1) > 0))
	            gfp.ATHcurve = abr_switch_map[r].ath_curve;
	        // SET_OPTION(ATHcurve, abr_switch_map[r].ath_curve, -1);

	        if (enforce != 0)
	            gfp.interChRatio = abr_switch_map[r].interch;
	        else if (!(Math.abs(gfp.interChRatio - -1) > 0))
	            gfp.interChRatio = abr_switch_map[r].interch;
	        // SET_OPTION(interChRatio, abr_switch_map[r].interch, -1);

	        return preset;
	    }