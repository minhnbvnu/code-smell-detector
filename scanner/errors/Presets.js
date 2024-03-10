	    function VBRPresets(qual, comp, compS,
	    function ABRPresets(kbps, comp, compS,
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
	    this.apply_preset = function(gfp, preset, enforce) {
	        /* translate legacy presets */
	        switch (preset) {
	            case Lame.R3MIX:
	            {
	                preset = Lame.V3;
	                gfp.VBR = VbrMode.vbr_mtrh;
	                break;
	            }
	            case Lame.MEDIUM:
	            {
	                preset = Lame.V4;
	                gfp.VBR = VbrMode.vbr_rh;
	                break;
	            }
	            case Lame.MEDIUM_FAST:
	            {
	                preset = Lame.V4;
	                gfp.VBR = VbrMode.vbr_mtrh;
	                break;
	            }
	            case Lame.STANDARD:
	            {
	                preset = Lame.V2;
	                gfp.VBR = VbrMode.vbr_rh;
	                break;
	            }
	            case Lame.STANDARD_FAST:
	            {
	                preset = Lame.V2;
	                gfp.VBR = VbrMode.vbr_mtrh;
	                break;
	            }
	            case Lame.EXTREME:
	            {
	                preset = Lame.V0;
	                gfp.VBR = VbrMode.vbr_rh;
	                break;
	            }
	            case Lame.EXTREME_FAST:
	            {
	                preset = Lame.V0;
	                gfp.VBR = VbrMode.vbr_mtrh;
	                break;
	            }
	            case Lame.INSANE:
	            {
	                preset = 320;
	                gfp.preset = preset;
	                apply_abr_preset(gfp, preset, enforce);
	                gfp.VBR = VbrMode.vbr_off;
	                return preset;
	            }
	        }

	        gfp.preset = preset;
	        {
	            switch (preset) {
	                case Lame.V9:
	                    apply_vbr_preset(gfp, 9, enforce);
	                    return preset;
	                case Lame.V8:
	                    apply_vbr_preset(gfp, 8, enforce);
	                    return preset;
	                case Lame.V7:
	                    apply_vbr_preset(gfp, 7, enforce);
	                    return preset;
	                case Lame.V6:
	                    apply_vbr_preset(gfp, 6, enforce);
	                    return preset;
	                case Lame.V5:
	                    apply_vbr_preset(gfp, 5, enforce);
	                    return preset;
	                case Lame.V4:
	                    apply_vbr_preset(gfp, 4, enforce);
	                    return preset;
	                case Lame.V3:
	                    apply_vbr_preset(gfp, 3, enforce);
	                    return preset;
	                case Lame.V2:
	                    apply_vbr_preset(gfp, 2, enforce);
	                    return preset;
	                case Lame.V1:
	                    apply_vbr_preset(gfp, 1, enforce);
	                    return preset;
	                case Lame.V0:
	                    apply_vbr_preset(gfp, 0, enforce);
	                    return preset;
	                default:
	                    break;
	            }
	        }
	        if (8 <= preset && preset <= 320) {
	            return apply_abr_preset(gfp, preset, enforce);
	        }

	        /* no corresponding preset found */
	        gfp.preset = 0;
	        return preset;
	    }