function apply_vbr_preset(gfp, a, enforce) {
	        var vbr_preset = gfp.VBR == VbrMode.vbr_rh ? vbr_old_switch_map
	            : vbr_psy_switch_map;

	        var x = gfp.VBR_q_frac;
	        var p = vbr_preset[a];
	        var q = vbr_preset[a + 1];
	        var set = p;

	        // NOOP(vbr_q);
	        // NOOP(quant_comp);
	        // NOOP(quant_comp_s);
	        // NOOP(expY);
	        p.st_lrm = p.st_lrm + x * (q.st_lrm - p.st_lrm);
	        // LERP(st_lrm);
	        p.st_s = p.st_s + x * (q.st_s - p.st_s);
	        // LERP(st_s);
	        p.masking_adj = p.masking_adj + x * (q.masking_adj - p.masking_adj);
	        // LERP(masking_adj);
	        p.masking_adj_short = p.masking_adj_short + x
	            * (q.masking_adj_short - p.masking_adj_short);
	        // LERP(masking_adj_short);
	        p.ath_lower = p.ath_lower + x * (q.ath_lower - p.ath_lower);
	        // LERP(ath_lower);
	        p.ath_curve = p.ath_curve + x * (q.ath_curve - p.ath_curve);
	        // LERP(ath_curve);
	        p.ath_sensitivity = p.ath_sensitivity + x
	            * (q.ath_sensitivity - p.ath_sensitivity);
	        // LERP(ath_sensitivity);
	        p.interch = p.interch + x * (q.interch - p.interch);
	        // LERP(interch);
	        // NOOP(safejoint);
	        // NOOP(sfb21mod);
	        p.msfix = p.msfix + x * (q.msfix - p.msfix);
	        // LERP(msfix);

	        lame_set_VBR_q(gfp, set.vbr_q);

	        if (enforce != 0)
	            gfp.quant_comp = set.quant_comp;
	        else if (!(Math.abs(gfp.quant_comp - -1) > 0))
	            gfp.quant_comp = set.quant_comp;
	        // SET_OPTION(quant_comp, set.quant_comp, -1);
	        if (enforce != 0)
	            gfp.quant_comp_short = set.quant_comp_s;
	        else if (!(Math.abs(gfp.quant_comp_short - -1) > 0))
	            gfp.quant_comp_short = set.quant_comp_s;
	        // SET_OPTION(quant_comp_short, set.quant_comp_s, -1);
	        if (set.expY != 0) {
	            gfp.experimentalY = set.expY != 0;
	        }
	        if (enforce != 0)
	            gfp.internal_flags.nsPsy.attackthre = set.st_lrm;
	        else if (!(Math.abs(gfp.internal_flags.nsPsy.attackthre - -1) > 0))
	            gfp.internal_flags.nsPsy.attackthre = set.st_lrm;
	        // SET_OPTION(short_threshold_lrm, set.st_lrm, -1);
	        if (enforce != 0)
	            gfp.internal_flags.nsPsy.attackthre_s = set.st_s;
	        else if (!(Math.abs(gfp.internal_flags.nsPsy.attackthre_s - -1) > 0))
	            gfp.internal_flags.nsPsy.attackthre_s = set.st_s;
	        // SET_OPTION(short_threshold_s, set.st_s, -1);
	        if (enforce != 0)
	            gfp.maskingadjust = set.masking_adj;
	        else if (!(Math.abs(gfp.maskingadjust - 0) > 0))
	            gfp.maskingadjust = set.masking_adj;
	        // SET_OPTION(maskingadjust, set.masking_adj, 0);
	        if (enforce != 0)
	            gfp.maskingadjust_short = set.masking_adj_short;
	        else if (!(Math.abs(gfp.maskingadjust_short - 0) > 0))
	            gfp.maskingadjust_short = set.masking_adj_short;
	        // SET_OPTION(maskingadjust_short, set.masking_adj_short, 0);
	        if (enforce != 0)
	            gfp.ATHlower = -set.ath_lower / 10.0;
	        else if (!(Math.abs((-gfp.ATHlower * 10.0) - 0) > 0))
	            gfp.ATHlower = -set.ath_lower / 10.0;
	        // SET_OPTION(ATHlower, set.ath_lower, 0);
	        if (enforce != 0)
	            gfp.ATHcurve = set.ath_curve;
	        else if (!(Math.abs(gfp.ATHcurve - -1) > 0))
	            gfp.ATHcurve = set.ath_curve;
	        // SET_OPTION(ATHcurve, set.ath_curve, -1);
	        if (enforce != 0)
	            gfp.athaa_sensitivity = set.ath_sensitivity;
	        else if (!(Math.abs(gfp.athaa_sensitivity - -1) > 0))
	            gfp.athaa_sensitivity = set.ath_sensitivity;
	        // SET_OPTION(athaa_sensitivity, set.ath_sensitivity, 0);
	        if (set.interch > 0) {
	            if (enforce != 0)
	                gfp.interChRatio = set.interch;
	            else if (!(Math.abs(gfp.interChRatio - -1) > 0))
	                gfp.interChRatio = set.interch;
	            // SET_OPTION(interChRatio, set.interch, -1);
	        }

	        /* parameters for which there is no proper set/get interface */
	        if (set.safejoint > 0) {
	            gfp.exp_nspsytune = gfp.exp_nspsytune | set.safejoint;
	        }
	        if (set.sfb21mod > 0) {
	            gfp.exp_nspsytune = gfp.exp_nspsytune | (set.sfb21mod << 20);
	        }
	        if (enforce != 0)
	            gfp.msfix = set.msfix;
	        else if (!(Math.abs(gfp.msfix - -1) > 0))
	            gfp.msfix = set.msfix;
	        // SET_OPTION(msfix, set.msfix, -1);

	        if (enforce == 0) {
	            gfp.VBR_q = a;
	            gfp.VBR_q_frac = x;
	        }
	    }