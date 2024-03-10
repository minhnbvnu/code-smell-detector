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
	    function filterYule(input, inputPos, output, outputPos, nSamples, kernel) {
	    function filterButter(input, inputPos, output, outputPos, nSamples, kernel) {
	    this.AnalyzeSamples = function (rgData, left_samples, left_samplesPos, right_samples, right_samplesPos, num_samples,
	    function quantize_lines_xrpow_01(l, istep, xr, xrPos, ix, ixPos) {
	    function quantize_lines_xrpow(l, istep, xr, xrPos, ix, ixPos) {
	    function quantize_xrpow(xp, pi, istep, codInfo, prevNoise) {
	        /* quantize on xr^(3/4) instead of xr */
	        var sfb;
	        var sfbmax;
	        var j = 0;
	        var prev_data_use;
	        var accumulate = 0;
	        var accumulate01 = 0;
	        var xpPos = 0;
	        var iData = pi;
	        var iDataPos = 0;
	        var acc_iData = iData;
	        var acc_iDataPos = 0;
	        var acc_xp = xp;
	        var acc_xpPos = 0;

	        /*
	         * Reusing previously computed data does not seems to work if global
	         * gain is changed. Finding why it behaves this way would allow to use a
	         * cache of previously computed values (let's 10 cached values per sfb)
	         * that would probably provide a noticeable speedup
	         */
	        prev_data_use = (prevNoise != null && (codInfo.global_gain == prevNoise.global_gain));

	        if (codInfo.block_type == Encoder.SHORT_TYPE)
	            sfbmax = 38;
	        else
	            sfbmax = 21;

	        for (sfb = 0; sfb <= sfbmax; sfb++) {
	            var step = -1;

	            if (prev_data_use || codInfo.block_type == Encoder.NORM_TYPE) {
	                step = codInfo.global_gain
	                    - ((codInfo.scalefac[sfb] + (codInfo.preflag != 0 ? qupvt.pretab[sfb]
	                        : 0)) << (codInfo.scalefac_scale + 1))
	                    - codInfo.subblock_gain[codInfo.window[sfb]] * 8;
	            }
	            if (prev_data_use && (prevNoise.step[sfb] == step)) {
	                /*
	                 * do not recompute this part, but compute accumulated lines
	                 */
	                if (accumulate != 0) {
	                    quantize_lines_xrpow(accumulate, istep, acc_xp, acc_xpPos,
	                        acc_iData, acc_iDataPos);
	                    accumulate = 0;
	                }
	                if (accumulate01 != 0) {
	                    quantize_lines_xrpow_01(accumulate01, istep, acc_xp,
	                        acc_xpPos, acc_iData, acc_iDataPos);
	                    accumulate01 = 0;
	                }
	            } else { /* should compute this part */
	                var l = codInfo.width[sfb];

	                if ((j + codInfo.width[sfb]) > codInfo.max_nonzero_coeff) {
	                    /* do not compute upper zero part */
	                    var usefullsize;
	                    usefullsize = codInfo.max_nonzero_coeff - j + 1;
	                    Arrays.fill(pi, codInfo.max_nonzero_coeff, 576, 0);
	                    l = usefullsize;

	                    if (l < 0) {
	                        l = 0;
	                    }

	                    /* no need to compute higher sfb values */
	                    sfb = sfbmax + 1;
	                }

	                /* accumulate lines to quantize */
	                if (0 == accumulate && 0 == accumulate01) {
	                    acc_iData = iData;
	                    acc_iDataPos = iDataPos;
	                    acc_xp = xp;
	                    acc_xpPos = xpPos;
	                }
	                if (prevNoise != null && prevNoise.sfb_count1 > 0
	                    && sfb >= prevNoise.sfb_count1
	                    && prevNoise.step[sfb] > 0
	                    && step >= prevNoise.step[sfb]) {

	                    if (accumulate != 0) {
	                        quantize_lines_xrpow(accumulate, istep, acc_xp,
	                            acc_xpPos, acc_iData, acc_iDataPos);
	                        accumulate = 0;
	                        acc_iData = iData;
	                        acc_iDataPos = iDataPos;
	                        acc_xp = xp;
	                        acc_xpPos = xpPos;
	                    }
	                    accumulate01 += l;
	                } else {
	                    if (accumulate01 != 0) {
	                        quantize_lines_xrpow_01(accumulate01, istep, acc_xp,
	                            acc_xpPos, acc_iData, acc_iDataPos);
	                        accumulate01 = 0;
	                        acc_iData = iData;
	                        acc_iDataPos = iDataPos;
	                        acc_xp = xp;
	                        acc_xpPos = xpPos;
	                    }
	                    accumulate += l;
	                }

	                if (l <= 0) {
	                    /*
	                     * rh: 20040215 may happen due to "prev_data_use"
	                     * optimization
	                     */
	                    if (accumulate01 != 0) {
	                        quantize_lines_xrpow_01(accumulate01, istep, acc_xp,
	                            acc_xpPos, acc_iData, acc_iDataPos);
	                        accumulate01 = 0;
	                    }
	                    if (accumulate != 0) {
	                        quantize_lines_xrpow(accumulate, istep, acc_xp,
	                            acc_xpPos, acc_iData, acc_iDataPos);
	                        accumulate = 0;
	                    }

	                    break;
	                    /* ends for-loop */
	                }
	            }
	            if (sfb <= sfbmax) {
	                iDataPos += codInfo.width[sfb];
	                xpPos += codInfo.width[sfb];
	                j += codInfo.width[sfb];
	            }
	        }
	        if (accumulate != 0) { /* last data part */
	            quantize_lines_xrpow(accumulate, istep, acc_xp, acc_xpPos,
	                acc_iData, acc_iDataPos);
	            accumulate = 0;
	        }
	        if (accumulate01 != 0) { /* last data part */
	            quantize_lines_xrpow_01(accumulate01, istep, acc_xp, acc_xpPos,
	                acc_iData, acc_iDataPos);
	            accumulate01 = 0;
	        }

	    }
	    function count_bit_ESC(ix, ixPos, end, t1, t2, s) {
	    function choose_table(ix, ixPos, endPos, s) {
	        var max = ix_max(ix, ixPos, endPos);

	        switch (max) {
	            case 0:
	                return max;

	            case 1:
	                return count_bit_noESC(ix, ixPos, endPos, s);

	            case 2:
	            case 3:
	                return count_bit_noESC_from2(ix, ixPos, endPos,
	                    huf_tbl_noESC[max - 1], s);

	            case 4:
	            case 5:
	            case 6:
	            case 7:
	            case 8:
	            case 9:
	            case 10:
	            case 11:
	            case 12:
	            case 13:
	            case 14:
	            case 15:
	                return count_bit_noESC_from3(ix, ixPos, endPos,
	                    huf_tbl_noESC[max - 1], s);

	            default:
	                /* try tables with linbits */
	                if (max > QuantizePVT.IXMAX_VAL) {
	                    s.bits = QuantizePVT.LARGE_BITS;
	                    return -1;
	                }
	                max -= 15;
	                var choice2;
	                for (choice2 = 24; choice2 < 32; choice2++) {
	                    if (Tables.ht[choice2].linmax >= max) {
	                        break;
	                    }
	                }
	                var choice;
	                for (choice = choice2 - 8; choice < 24; choice++) {
	                    if (Tables.ht[choice].linmax >= max) {
	                        break;
	                    }
	                }
	                return count_bit_ESC(ix, ixPos, endPos, choice, choice2, s);
	        }
	    }
	    function recalc_divide_init(gfc, cod_info, ix, r01_bits, r01_div, r0_tbl, r1_tbl) {
	    function recalc_divide_sub(gfc, cod_info2, gi, ix, r01_bits, r01_div, r0_tbl, r1_tbl) {
	    this.best_scalefac_store = function (gfc, gr, ch, l3_side) {
	        /* use scalefac_scale if we can */
	        var gi = l3_side.tt[gr][ch];
	        var sfb, i, j, l;
	        var recalc = 0;

	        /*
	         * remove scalefacs from bands with ix=0. This idea comes from the AAC
	         * ISO docs. added mt 3/00
	         */
	        /* check if l3_enc=0 */
	        j = 0;
	        for (sfb = 0; sfb < gi.sfbmax; sfb++) {
	            var width = gi.width[sfb];
	            j += width;
	            for (l = -width; l < 0; l++) {
	                if (gi.l3_enc[l + j] != 0)
	                    break;
	            }
	            if (l == 0)
	                gi.scalefac[sfb] = recalc = -2;
	            /* anything goes. */
	            /*
	             * only best_scalefac_store and calc_scfsi know--and only they
	             * should know--about the magic number -2.
	             */
	        }

	        if (0 == gi.scalefac_scale && 0 == gi.preflag) {
	            var s = 0;
	            for (sfb = 0; sfb < gi.sfbmax; sfb++)
	                if (gi.scalefac[sfb] > 0)
	                    s |= gi.scalefac[sfb];

	            if (0 == (s & 1) && s != 0) {
	                for (sfb = 0; sfb < gi.sfbmax; sfb++)
	                    if (gi.scalefac[sfb] > 0)
	                        gi.scalefac[sfb] >>= 1;

	                gi.scalefac_scale = recalc = 1;
	            }
	        }

	        if (0 == gi.preflag && gi.block_type != Encoder.SHORT_TYPE
	            && gfc.mode_gr == 2) {
	            for (sfb = 11; sfb < Encoder.SBPSY_l; sfb++)
	                if (gi.scalefac[sfb] < qupvt.pretab[sfb]
	                    && gi.scalefac[sfb] != -2)
	                    break;
	            if (sfb == Encoder.SBPSY_l) {
	                for (sfb = 11; sfb < Encoder.SBPSY_l; sfb++)
	                    if (gi.scalefac[sfb] > 0)
	                        gi.scalefac[sfb] -= qupvt.pretab[sfb];

	                gi.preflag = recalc = 1;
	            }
	        }

	        for (i = 0; i < 4; i++)
	            l3_side.scfsi[ch][i] = 0;

	        if (gfc.mode_gr == 2 && gr == 1
	            && l3_side.tt[0][ch].block_type != Encoder.SHORT_TYPE
	            && l3_side.tt[1][ch].block_type != Encoder.SHORT_TYPE) {
	            scfsi_calc(ch, l3_side);
	            recalc = 0;
	        }
	        for (sfb = 0; sfb < gi.sfbmax; sfb++) {
	            if (gi.scalefac[sfb] == -2) {
	                gi.scalefac[sfb] = 0;
	                /* if anything goes, then 0 is a good choice */
	            }
	        }
	        if (recalc != 0) {
	            if (gfc.mode_gr == 2) {
	                this.scale_bitcount(gi);
	            } else {
	                this.scale_bitcount_lsf(gfc, gi);
	            }
	        }
	    }
	    function encodeSideInfo2(gfp, bitsPerFrame) {
	        var gfc = gfp.internal_flags;
	        var l3_side;
	        var gr, ch;

	        l3_side = gfc.l3_side;
	        gfc.header[gfc.h_ptr].ptr = 0;
	        Arrays.fill(gfc.header[gfc.h_ptr].buf, 0, gfc.sideinfo_len, 0);
	        if (gfp.out_samplerate < 16000)
	            writeheader(gfc, 0xffe, 12);
	        else
	            writeheader(gfc, 0xfff, 12);
	        writeheader(gfc, (gfp.version), 1);
	        writeheader(gfc, 4 - 3, 2);
	        writeheader(gfc, (!gfp.error_protection ? 1 : 0), 1);
	        writeheader(gfc, (gfc.bitrate_index), 4);
	        writeheader(gfc, (gfc.samplerate_index), 2);
	        writeheader(gfc, (gfc.padding), 1);
	        writeheader(gfc, (gfp.extension), 1);
	        writeheader(gfc, (gfp.mode.ordinal()), 2);
	        writeheader(gfc, (gfc.mode_ext), 2);
	        writeheader(gfc, (gfp.copyright), 1);
	        writeheader(gfc, (gfp.original), 1);
	        writeheader(gfc, (gfp.emphasis), 2);
	        if (gfp.error_protection) {
	            writeheader(gfc, 0, 16);
	            /* dummy */
	        }

	        if (gfp.version == 1) {
	            /* MPEG1 */
	            writeheader(gfc, (l3_side.main_data_begin), 9);

	            if (gfc.channels_out == 2)
	                writeheader(gfc, l3_side.private_bits, 3);
	            else
	                writeheader(gfc, l3_side.private_bits, 5);

	            for (ch = 0; ch < gfc.channels_out; ch++) {
	                var band;
	                for (band = 0; band < 4; band++) {
	                    writeheader(gfc, l3_side.scfsi[ch][band], 1);
	                }
	            }

	            for (gr = 0; gr < 2; gr++) {
	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    var gi = l3_side.tt[gr][ch];
	                    writeheader(gfc, gi.part2_3_length + gi.part2_length, 12);
	                    writeheader(gfc, gi.big_values / 2, 9);
	                    writeheader(gfc, gi.global_gain, 8);
	                    writeheader(gfc, gi.scalefac_compress, 4);

	                    if (gi.block_type != Encoder.NORM_TYPE) {
	                        writeheader(gfc, 1, 1);
	                        /* window_switching_flag */
	                        writeheader(gfc, gi.block_type, 2);
	                        writeheader(gfc, gi.mixed_block_flag, 1);

	                        if (gi.table_select[0] == 14)
	                            gi.table_select[0] = 16;
	                        writeheader(gfc, gi.table_select[0], 5);
	                        if (gi.table_select[1] == 14)
	                            gi.table_select[1] = 16;
	                        writeheader(gfc, gi.table_select[1], 5);

	                        writeheader(gfc, gi.subblock_gain[0], 3);
	                        writeheader(gfc, gi.subblock_gain[1], 3);
	                        writeheader(gfc, gi.subblock_gain[2], 3);
	                    } else {
	                        writeheader(gfc, 0, 1);
	                        /* window_switching_flag */
	                        if (gi.table_select[0] == 14)
	                            gi.table_select[0] = 16;
	                        writeheader(gfc, gi.table_select[0], 5);
	                        if (gi.table_select[1] == 14)
	                            gi.table_select[1] = 16;
	                        writeheader(gfc, gi.table_select[1], 5);
	                        if (gi.table_select[2] == 14)
	                            gi.table_select[2] = 16;
	                        writeheader(gfc, gi.table_select[2], 5);

	                        writeheader(gfc, gi.region0_count, 4);
	                        writeheader(gfc, gi.region1_count, 3);
	                    }
	                    writeheader(gfc, gi.preflag, 1);
	                    writeheader(gfc, gi.scalefac_scale, 1);
	                    writeheader(gfc, gi.count1table_select, 1);
	                }
	            }
	        } else {
	            /* MPEG2 */
	            writeheader(gfc, (l3_side.main_data_begin), 8);
	            writeheader(gfc, l3_side.private_bits, gfc.channels_out);

	            gr = 0;
	            for (ch = 0; ch < gfc.channels_out; ch++) {
	                var gi = l3_side.tt[gr][ch];
	                writeheader(gfc, gi.part2_3_length + gi.part2_length, 12);
	                writeheader(gfc, gi.big_values / 2, 9);
	                writeheader(gfc, gi.global_gain, 8);
	                writeheader(gfc, gi.scalefac_compress, 9);

	                if (gi.block_type != Encoder.NORM_TYPE) {
	                    writeheader(gfc, 1, 1);
	                    /* window_switching_flag */
	                    writeheader(gfc, gi.block_type, 2);
	                    writeheader(gfc, gi.mixed_block_flag, 1);

	                    if (gi.table_select[0] == 14)
	                        gi.table_select[0] = 16;
	                    writeheader(gfc, gi.table_select[0], 5);
	                    if (gi.table_select[1] == 14)
	                        gi.table_select[1] = 16;
	                    writeheader(gfc, gi.table_select[1], 5);

	                    writeheader(gfc, gi.subblock_gain[0], 3);
	                    writeheader(gfc, gi.subblock_gain[1], 3);
	                    writeheader(gfc, gi.subblock_gain[2], 3);
	                } else {
	                    writeheader(gfc, 0, 1);
	                    /* window_switching_flag */
	                    if (gi.table_select[0] == 14)
	                        gi.table_select[0] = 16;
	                    writeheader(gfc, gi.table_select[0], 5);
	                    if (gi.table_select[1] == 14)
	                        gi.table_select[1] = 16;
	                    writeheader(gfc, gi.table_select[1], 5);
	                    if (gi.table_select[2] == 14)
	                        gi.table_select[2] = 16;
	                    writeheader(gfc, gi.table_select[2], 5);

	                    writeheader(gfc, gi.region0_count, 4);
	                    writeheader(gfc, gi.region1_count, 3);
	                }

	                writeheader(gfc, gi.scalefac_scale, 1);
	                writeheader(gfc, gi.count1table_select, 1);
	            }
	        }

	        if (gfp.error_protection) {
	            /* (jo) error_protection: add crc16 information to header */
	            CRC_writeheader(gfc, gfc.header[gfc.h_ptr].buf);
	        }

	        {
	            var old = gfc.h_ptr;

	            gfc.h_ptr = (old + 1) & (LameInternalFlags.MAX_HEADER_BUF - 1);
	            gfc.header[gfc.h_ptr].write_timing = gfc.header[old].write_timing
	                + bitsPerFrame;

	            if (gfc.h_ptr == gfc.w_ptr) {
	                /* yikes! we are out of header buffer space */
	                System.err
	                    .println("Error: MAX_HEADER_BUF too small in bitstream.c \n");
	            }

	        }
	    }
	    function putLameVBR(gfp, musicLength, streamBuffer, streamBufferPos, crc) {
	        var gfc = gfp.internal_flags;
	        var bytesWritten = 0;

	        /* encoder delay */
	        var encDelay = gfp.encoder_delay;
	        /* encoder padding */
	        var encPadding = gfp.encoder_padding;

	        /* recall: gfp.VBR_q is for example set by the switch -V */
	        /* gfp.quality by -q, -h, -f, etc */
	        var quality = (100 - 10 * gfp.VBR_q - gfp.quality);

	        var version = v.getLameVeryShortVersion();
	        var vbr;
	        var revision = 0x00;
	        var revMethod;
	        // numbering different in vbr_mode vs. Lame tag
	        var vbrTypeTranslator = [1, 5, 3, 2, 4, 0, 3];
	        var lowpass = 0 | (((gfp.lowpassfreq / 100.0) + .5) > 255 ? 255
	                : (gfp.lowpassfreq / 100.0) + .5);
	        var peakSignalAmplitude = 0;
	        var radioReplayGain = 0;
	        var audiophileReplayGain = 0;
	        var noiseShaping = gfp.internal_flags.noise_shaping;
	        var stereoMode = 0;
	        var nonOptimal = 0;
	        var sourceFreq = 0;
	        var misc = 0;
	        var musicCRC = 0;

	        // psy model type: Gpsycho or NsPsytune
	        var expNPsyTune = (gfp.exp_nspsytune & 1) != 0;
	        var safeJoint = (gfp.exp_nspsytune & 2) != 0;
	        var noGapMore = false;
	        var noGapPrevious = false;
	        var noGapCount = gfp.internal_flags.nogap_total;
	        var noGapCurr = gfp.internal_flags.nogap_current;

	        // 4 bits
	        var athType = gfp.ATHtype;
	        var flags = 0;

	        // vbr modes
	        var abrBitrate;
	        switch (gfp.VBR) {
	            case vbr_abr:
	                abrBitrate = gfp.VBR_mean_bitrate_kbps;
	                break;
	            case vbr_off:
	                abrBitrate = gfp.brate;
	                break;
	            default:
	                abrBitrate = gfp.VBR_min_bitrate_kbps;
	        }

	        // revision and vbr method
	        if (gfp.VBR.ordinal() < vbrTypeTranslator.length)
	            vbr = vbrTypeTranslator[gfp.VBR.ordinal()];
	        else
	            vbr = 0x00; // unknown

	        revMethod = 0x10 * revision + vbr;

	        // ReplayGain
	        if (gfc.findReplayGain) {
	            if (gfc.RadioGain > 0x1FE)
	                gfc.RadioGain = 0x1FE;
	            if (gfc.RadioGain < -0x1FE)
	                gfc.RadioGain = -0x1FE;

	            // set name code
	            radioReplayGain = 0x2000;
	            // set originator code to `determined automatically'
	            radioReplayGain |= 0xC00;

	            if (gfc.RadioGain >= 0) {
	                // set gain adjustment
	                radioReplayGain |= gfc.RadioGain;
	            } else {
	                // set the sign bit
	                radioReplayGain |= 0x200;
	                // set gain adjustment
	                radioReplayGain |= -gfc.RadioGain;
	            }
	        }

	        // peak sample
	        if (gfc.findPeakSample)
	            peakSignalAmplitude = Math
	                .abs(0 | ((( gfc.PeakSample) / 32767.0) * Math.pow(2, 23) + .5));

	        // nogap
	        if (noGapCount != -1) {
	            if (noGapCurr > 0)
	                noGapPrevious = true;

	            if (noGapCurr < noGapCount - 1)
	                noGapMore = true;
	        }

	        // flags
	        flags = athType + ((expNPsyTune ? 1 : 0) << 4)
	            + ((safeJoint ? 1 : 0) << 5) + ((noGapMore ? 1 : 0) << 6)
	            + ((noGapPrevious ? 1 : 0) << 7);

	        if (quality < 0)
	            quality = 0;

	        // stereo mode field (Intensity stereo is not implemented)
	        switch (gfp.mode) {
	            case MONO:
	                stereoMode = 0;
	                break;
	            case STEREO:
	                stereoMode = 1;
	                break;
	            case DUAL_CHANNEL:
	                stereoMode = 2;
	                break;
	            case JOINT_STEREO:
	                if (gfp.force_ms)
	                    stereoMode = 4;
	                else
	                    stereoMode = 3;
	                break;
	            case NOT_SET:
	            //$FALL-THROUGH$
	            default:
	                stereoMode = 7;
	                break;
	        }

	        if (gfp.in_samplerate <= 32000)
	            sourceFreq = 0x00;
	        else if (gfp.in_samplerate == 48000)
	            sourceFreq = 0x02;
	        else if (gfp.in_samplerate > 48000)
	            sourceFreq = 0x03;
	        else {
	            // default is 44100Hz
	            sourceFreq = 0x01;
	        }

	        // Check if the user overrided the default LAME behavior with some
	        // nasty options
	        if (gfp.short_blocks == ShortBlock.short_block_forced
	            || gfp.short_blocks == ShortBlock.short_block_dispensed
	            || ((gfp.lowpassfreq == -1) && (gfp.highpassfreq == -1)) || /* "-k" */
	            (gfp.scale_left < gfp.scale_right)
	            || (gfp.scale_left > gfp.scale_right)
	            || (gfp.disable_reservoir && gfp.brate < 320) || gfp.noATH
	            || gfp.ATHonly || (athType == 0) || gfp.in_samplerate <= 32000)
	            nonOptimal = 1;

	        misc = noiseShaping + (stereoMode << 2) + (nonOptimal << 5)
	            + (sourceFreq << 6);

	        musicCRC = gfc.nMusicCRC;

	        // Write all this information into the stream

	        createInteger(streamBuffer, streamBufferPos + bytesWritten, quality);
	        bytesWritten += 4;

	        for (var j = 0; j < 9; j++) {
	            streamBuffer[streamBufferPos + bytesWritten + j] = 0xff & version .charAt(j);
	        }
	        bytesWritten += 9;

	        streamBuffer[streamBufferPos + bytesWritten] = 0xff & revMethod;
	        bytesWritten++;

	        streamBuffer[streamBufferPos + bytesWritten] = 0xff & lowpass;
	        bytesWritten++;

	        createInteger(streamBuffer, streamBufferPos + bytesWritten,
	            peakSignalAmplitude);
	        bytesWritten += 4;

	        createShort(streamBuffer, streamBufferPos + bytesWritten,
	            radioReplayGain);
	        bytesWritten += 2;

	        createShort(streamBuffer, streamBufferPos + bytesWritten,
	            audiophileReplayGain);
	        bytesWritten += 2;

	        streamBuffer[streamBufferPos + bytesWritten] = 0xff & flags;
	        bytesWritten++;

	        if (abrBitrate >= 255)
	            streamBuffer[streamBufferPos + bytesWritten] = 0xFF;
	        else
	            streamBuffer[streamBufferPos + bytesWritten] = 0xff & abrBitrate;
	        bytesWritten++;

	        streamBuffer[streamBufferPos + bytesWritten] = 0xff & (encDelay >> 4);
	        streamBuffer[streamBufferPos + bytesWritten + 1] = 0xff & ((encDelay << 4) + (encPadding >> 8));
	        streamBuffer[streamBufferPos + bytesWritten + 2] = 0xff & encPadding;

	        bytesWritten += 3;

	        streamBuffer[streamBufferPos + bytesWritten] = 0xff & misc;
	        bytesWritten++;

	        // unused in rev0
	        streamBuffer[streamBufferPos + bytesWritten++] = 0;

	        createShort(streamBuffer, streamBufferPos + bytesWritten, gfp.preset);
	        bytesWritten += 2;

	        createInteger(streamBuffer, streamBufferPos + bytesWritten, musicLength);
	        bytesWritten += 4;

	        createShort(streamBuffer, streamBufferPos + bytesWritten, musicCRC);
	        bytesWritten += 2;

	        // Calculate tag CRC.... must be done here, since it includes previous
	        // information

	        for (var i = 0; i < bytesWritten; i++)
	            crc = crcUpdateLookup(streamBuffer[streamBufferPos + i], crc);

	        createShort(streamBuffer, streamBufferPos + bytesWritten, crc);
	        bytesWritten += 2;

	        return bytesWritten;
	    }
	    this.on_pe = function (gfp, pe,
	    this.calc_xmin = function (gfp, ratio, cod_info, pxmin) {
	        var pxminPos = 0;
	        var gfc = gfp.internal_flags;
	        var gsfb, j = 0, ath_over = 0;
	        var ATH = gfc.ATH;
	        var xr = cod_info.xr;
	        var enable_athaa_fix = (gfp.VBR == VbrMode.vbr_mtrh) ? 1 : 0;
	        var masking_lower = gfc.masking_lower;

	        if (gfp.VBR == VbrMode.vbr_mtrh || gfp.VBR == VbrMode.vbr_mt) {
	            /* was already done in PSY-Model */
	            masking_lower = 1.0;
	        }

	        for (gsfb = 0; gsfb < cod_info.psy_lmax; gsfb++) {
	            var en0, xmin;
	            var rh1, rh2;
	            var width, l;

	            if (gfp.VBR == VbrMode.vbr_rh || gfp.VBR == VbrMode.vbr_mtrh)
	                xmin = athAdjust(ATH.adjust, ATH.l[gsfb], ATH.floor);
	            else
	                xmin = ATH.adjust * ATH.l[gsfb];

	            width = cod_info.width[gsfb];
	            rh1 = xmin / width;
	            rh2 = DBL_EPSILON;
	            l = width >> 1;
	            en0 = 0.0;
	            do {
	                var xa, xb;
	                xa = xr[j] * xr[j];
	                en0 += xa;
	                rh2 += (xa < rh1) ? xa : rh1;
	                j++;
	                xb = xr[j] * xr[j];
	                en0 += xb;
	                rh2 += (xb < rh1) ? xb : rh1;
	                j++;
	            } while (--l > 0);
	            if (en0 > xmin)
	                ath_over++;

	            if (gsfb == Encoder.SBPSY_l) {
	                var x = xmin * gfc.nsPsy.longfact[gsfb];
	                if (rh2 < x) {
	                    rh2 = x;
	                }
	            }
	            if (enable_athaa_fix != 0) {
	                xmin = rh2;
	            }
	            if (!gfp.ATHonly) {
	                var e = ratio.en.l[gsfb];
	                if (e > 0.0) {
	                    var x;
	                    x = en0 * ratio.thm.l[gsfb] * masking_lower / e;
	                    if (enable_athaa_fix != 0)
	                        x *= gfc.nsPsy.longfact[gsfb];
	                    if (xmin < x)
	                        xmin = x;
	                }
	            }
	            if (enable_athaa_fix != 0)
	                pxmin[pxminPos++] = xmin;
	            else
	                pxmin[pxminPos++] = xmin * gfc.nsPsy.longfact[gsfb];
	        }
	        /* end of long block loop */

	        /* use this function to determine the highest non-zero coeff */
	        var max_nonzero = 575;
	        if (cod_info.block_type != Encoder.SHORT_TYPE) {
	            // NORM, START or STOP type, but not SHORT
	            var k = 576;
	            while (k-- != 0 && BitStream.EQ(xr[k], 0)) {
	                max_nonzero = k;
	            }
	        }
	        cod_info.max_nonzero_coeff = max_nonzero;

	        for (var sfb = cod_info.sfb_smin; gsfb < cod_info.psymax; sfb++, gsfb += 3) {
	            var width, b;
	            var tmpATH;
	            if (gfp.VBR == VbrMode.vbr_rh || gfp.VBR == VbrMode.vbr_mtrh)
	                tmpATH = athAdjust(ATH.adjust, ATH.s[sfb], ATH.floor);
	            else
	                tmpATH = ATH.adjust * ATH.s[sfb];

	            width = cod_info.width[gsfb];
	            for (b = 0; b < 3; b++) {
	                var en0 = 0.0, xmin;
	                var rh1, rh2;
	                var l = width >> 1;

	                rh1 = tmpATH / width;
	                rh2 = DBL_EPSILON;
	                do {
	                    var xa, xb;
	                    xa = xr[j] * xr[j];
	                    en0 += xa;
	                    rh2 += (xa < rh1) ? xa : rh1;
	                    j++;
	                    xb = xr[j] * xr[j];
	                    en0 += xb;
	                    rh2 += (xb < rh1) ? xb : rh1;
	                    j++;
	                } while (--l > 0);
	                if (en0 > tmpATH)
	                    ath_over++;
	                if (sfb == Encoder.SBPSY_s) {
	                    var x = tmpATH * gfc.nsPsy.shortfact[sfb];
	                    if (rh2 < x) {
	                        rh2 = x;
	                    }
	                }
	                if (enable_athaa_fix != 0)
	                    xmin = rh2;
	                else
	                    xmin = tmpATH;

	                if (!gfp.ATHonly && !gfp.ATHshort) {
	                    var e = ratio.en.s[sfb][b];
	                    if (e > 0.0) {
	                        var x;
	                        x = en0 * ratio.thm.s[sfb][b] * masking_lower / e;
	                        if (enable_athaa_fix != 0)
	                            x *= gfc.nsPsy.shortfact[sfb];
	                        if (xmin < x)
	                            xmin = x;
	                    }
	                }
	                if (enable_athaa_fix != 0)
	                    pxmin[pxminPos++] = xmin;
	                else
	                    pxmin[pxminPos++] = xmin * gfc.nsPsy.shortfact[sfb];
	            }
	            /* b */
	            if (gfp.useTemporal) {
	                if (pxmin[pxminPos - 3] > pxmin[pxminPos - 3 + 1])
	                    pxmin[pxminPos - 3 + 1] += (pxmin[pxminPos - 3] - pxmin[pxminPos - 3 + 1])
	                        * gfc.decay;
	                if (pxmin[pxminPos - 3 + 1] > pxmin[pxminPos - 3 + 2])
	                    pxmin[pxminPos - 3 + 2] += (pxmin[pxminPos - 3 + 1] - pxmin[pxminPos - 3 + 2])
	                        * gfc.decay;
	            }
	        }
	        /* end of short block sfb loop */

	        return ath_over;
	    };
	    function quant_compare(quant_comp, best, calc, gi, distort) {
	        /**
	         * noise is given in decibels (dB) relative to masking thesholds.<BR>
	         *
	         * over_noise: ??? (the previous comment is fully wrong)<BR>
	         * tot_noise: ??? (the previous comment is fully wrong)<BR>
	         * max_noise: max quantization noise
	         */
	        var better;

	        switch (quant_comp) {
	            default:
	            case 9:
	            {
	                if (best.over_count > 0) {
	                    /* there are distorted sfb */
	                    better = calc.over_SSD <= best.over_SSD;
	                    if (calc.over_SSD == best.over_SSD)
	                        better = calc.bits < best.bits;
	                } else {
	                    /* no distorted sfb */
	                    better = ((calc.max_noise < 0) && ((calc.max_noise * 10 + calc.bits) <= (best.max_noise * 10 + best.bits)));
	                }
	                break;
	            }

	            case 0:
	                better = calc.over_count < best.over_count
	                    || (calc.over_count == best.over_count && calc.over_noise < best.over_noise)
	                    || (calc.over_count == best.over_count
	                    && BitStream.EQ(calc.over_noise, best.over_noise) && calc.tot_noise < best.tot_noise);
	                break;

	            case 8:
	                calc.max_noise = get_klemm_noise(distort, gi);
	            //$FALL-THROUGH$
	            case 1:
	                better = calc.max_noise < best.max_noise;
	                break;
	            case 2:
	                better = calc.tot_noise < best.tot_noise;
	                break;
	            case 3:
	                better = (calc.tot_noise < best.tot_noise)
	                    && (calc.max_noise < best.max_noise);
	                break;
	            case 4:
	                better = (calc.max_noise <= 0.0 && best.max_noise > 0.2)
	                    || (calc.max_noise <= 0.0 && best.max_noise < 0.0
	                    && best.max_noise > calc.max_noise - 0.2 && calc.tot_noise < best.tot_noise)
	                    || (calc.max_noise <= 0.0 && best.max_noise > 0.0
	                    && best.max_noise > calc.max_noise - 0.2 && calc.tot_noise < best.tot_noise
	                    + best.over_noise)
	                    || (calc.max_noise > 0.0 && best.max_noise > -0.05
	                    && best.max_noise > calc.max_noise - 0.1 && calc.tot_noise
	                    + calc.over_noise < best.tot_noise
	                    + best.over_noise)
	                    || (calc.max_noise > 0.0 && best.max_noise > -0.1
	                    && best.max_noise > calc.max_noise - 0.15 && calc.tot_noise
	                    + calc.over_noise + calc.over_noise < best.tot_noise
	                    + best.over_noise + best.over_noise);
	                break;
	            case 5:
	                better = calc.over_noise < best.over_noise
	                    || (BitStream.EQ(calc.over_noise, best.over_noise) && calc.tot_noise < best.tot_noise);
	                break;
	            case 6:
	                better = calc.over_noise < best.over_noise
	                    || (BitStream.EQ(calc.over_noise, best.over_noise) && (calc.max_noise < best.max_noise || (BitStream
	                        .EQ(calc.max_noise, best.max_noise) && calc.tot_noise <= best.tot_noise)));
	                break;
	            case 7:
	                better = calc.over_count < best.over_count
	                    || calc.over_noise < best.over_noise;
	                break;
	        }

	        if (best.over_count == 0) {
	            /*
	             * If no distorted bands, only use this quantization if it is
	             * better, and if it uses less bits. Unfortunately, part2_3_length
	             * is sometimes a poor estimator of the final size at low bitrates.
	             */
	            better = better && calc.bits < best.bits;
	        }

	        return better;
	    }
	    this.outer_loop = function (gfp, cod_info, l3_xmin, xrpow, ch, targ_bits) {
	        var gfc = gfp.internal_flags;
	        var cod_info_w = new GrInfo();
	        var save_xrpow = new_float(576);
	        var distort = new_float(L3Side.SFBMAX);
	        var best_noise_info = new CalcNoiseResult();
	        var better;
	        var prev_noise = new CalcNoiseData();
	        var best_part2_3_length = 9999999;
	        var bEndOfSearch = false;
	        var bRefine = false;
	        var best_ggain_pass1 = 0;

	        bin_search_StepSize(gfc, cod_info, targ_bits, ch, xrpow);

	        if (0 == gfc.noise_shaping)
	        /* fast mode, no noise shaping, we are ready */
	            return 100;
	        /* default noise_info.over_count */

	        /* compute the distortion in this quantization */
	        /* coefficients and thresholds both l/r (or both mid/side) */
	        qupvt.calc_noise(cod_info, l3_xmin, distort, best_noise_info,
	            prev_noise);
	        best_noise_info.bits = cod_info.part2_3_length;

	        cod_info_w.assign(cod_info);
	        var age = 0;
	        System.arraycopy(xrpow, 0, save_xrpow, 0, 576);

	        while (!bEndOfSearch) {
	            /* BEGIN MAIN LOOP */
	            do {
	                var noise_info = new CalcNoiseResult();
	                var search_limit;
	                var maxggain = 255;

	                /*
	                 * When quantization with no distorted bands is found, allow up
	                 * to X new unsuccesful tries in serial. This gives us more
	                 * possibilities for different quant_compare modes. Much more
	                 * than 3 makes not a big difference, it is only slower.
	                 */

	                if ((gfc.substep_shaping & 2) != 0) {
	                    search_limit = 20;
	                } else {
	                    search_limit = 3;
	                }

	                /*
	                 * Check if the last scalefactor band is distorted. in VBR mode
	                 * we can't get rid of the distortion, so quit now and VBR mode
	                 * will try again with more bits. (makes a 10% speed increase,
	                 * the files I tested were binary identical, 2000/05/20 Robert
	                 * Hegemann) distort[] > 1 means noise > allowed noise
	                 */
	                if (gfc.sfb21_extra) {
	                    if (distort[cod_info_w.sfbmax] > 1.0)
	                        break;
	                    if (cod_info_w.block_type == Encoder.SHORT_TYPE
	                        && (distort[cod_info_w.sfbmax + 1] > 1.0 || distort[cod_info_w.sfbmax + 2] > 1.0))
	                        break;
	                }

	                /* try a new scalefactor conbination on cod_info_w */
	                if (!balance_noise(gfp, cod_info_w, distort, xrpow, bRefine))
	                    break;
	                if (cod_info_w.scalefac_scale != 0)
	                    maxggain = 254;

	                /*
	                 * inner_loop starts with the initial quantization step computed
	                 * above and slowly increases until the bits < huff_bits. Thus
	                 * it is important not to start with too large of an inital
	                 * quantization step. Too small is ok, but inner_loop will take
	                 * longer
	                 */
	                var huff_bits = targ_bits - cod_info_w.part2_length;
	                if (huff_bits <= 0)
	                    break;

	                /*
	                 * increase quantizer stepsize until needed bits are below
	                 * maximum
	                 */
	                while ((cod_info_w.part2_3_length = tk.count_bits(gfc, xrpow,
	                    cod_info_w, prev_noise)) > huff_bits
	                && cod_info_w.global_gain <= maxggain)
	                    cod_info_w.global_gain++;

	                if (cod_info_w.global_gain > maxggain)
	                    break;

	                if (best_noise_info.over_count == 0) {

	                    while ((cod_info_w.part2_3_length = tk.count_bits(gfc,
	                        xrpow, cod_info_w, prev_noise)) > best_part2_3_length
	                    && cod_info_w.global_gain <= maxggain)
	                        cod_info_w.global_gain++;

	                    if (cod_info_w.global_gain > maxggain)
	                        break;
	                }

	                /* compute the distortion in this quantization */
	                qupvt.calc_noise(cod_info_w, l3_xmin, distort, noise_info,
	                    prev_noise);
	                noise_info.bits = cod_info_w.part2_3_length;

	                /*
	                 * check if this quantization is better than our saved
	                 * quantization
	                 */
	                if (cod_info.block_type != Encoder.SHORT_TYPE) {
	                    // NORM, START or STOP type
	                    better = gfp.quant_comp;
	                } else
	                    better = gfp.quant_comp_short;

	                better = quant_compare(better, best_noise_info, noise_info,
	                    cod_info_w, distort) ? 1 : 0;

	                /* save data so we can restore this quantization later */
	                if (better != 0) {
	                    best_part2_3_length = cod_info.part2_3_length;
	                    best_noise_info = noise_info;
	                    cod_info.assign(cod_info_w);
	                    age = 0;
	                    /* save data so we can restore this quantization later */
	                    /* store for later reuse */
	                    System.arraycopy(xrpow, 0, save_xrpow, 0, 576);
	                } else {
	                    /* early stop? */
	                    if (gfc.full_outer_loop == 0) {
	                        if (++age > search_limit
	                            && best_noise_info.over_count == 0)
	                            break;
	                        if ((gfc.noise_shaping_amp == 3) && bRefine && age > 30)
	                            break;
	                        if ((gfc.noise_shaping_amp == 3)
	                            && bRefine
	                            && (cod_info_w.global_gain - best_ggain_pass1) > 15)
	                            break;
	                    }
	                }
	            } while ((cod_info_w.global_gain + cod_info_w.scalefac_scale) < 255);

	            if (gfc.noise_shaping_amp == 3) {
	                if (!bRefine) {
	                    /* refine search */
	                    cod_info_w.assign(cod_info);
	                    System.arraycopy(save_xrpow, 0, xrpow, 0, 576);
	                    age = 0;
	                    best_ggain_pass1 = cod_info_w.global_gain;

	                    bRefine = true;
	                } else {
	                    /* search already refined, stop */
	                    bEndOfSearch = true;
	                }

	            } else {
	                bEndOfSearch = true;
	            }
	        }

	        /*
	         * finish up
	         */
	        if (gfp.VBR == VbrMode.vbr_rh || gfp.VBR == VbrMode.vbr_mtrh)
	        /* restore for reuse on next try */
	            System.arraycopy(save_xrpow, 0, xrpow, 0, 576);
	        /*
	         * do the 'substep shaping'
	         */
	        else if ((gfc.substep_shaping & 1) != 0)
	            trancate_smallspectrums(gfc, cod_info, l3_xmin, xrpow);

	        return best_noise_info.over_count;
	    }
	    this.VBR_encode_granule = function (gfp, cod_info, l3_xmin, xrpow, ch, min_bits, max_bits) {
	    this.VBR_old_prepare = function (gfp, pe, ms_ener_ratio, ratio, l3_xmin, frameBits, min_bits,
	    this.VBR_new_prepare = function (gfp, pe, ratio, l3_xmin, frameBits, max_bits) {
	    this.calc_target_bits = function (gfp, pe, ms_ener_ratio, targ_bits, analog_silence_bits, max_frame_bits) {
	        var gfc = gfp.internal_flags;
	        var l3_side = gfc.l3_side;
	        var res_factor;
	        var gr, ch, totbits, mean_bits = 0;

	        gfc.bitrate_index = gfc.VBR_max_bitrate;
	        var mb = new MeanBits(mean_bits);
	        max_frame_bits[0] = rv.ResvFrameBegin(gfp, mb);
	        mean_bits = mb.bits;

	        gfc.bitrate_index = 1;
	        mean_bits = bs.getframebits(gfp) - gfc.sideinfo_len * 8;
	        analog_silence_bits[0] = mean_bits / (gfc.mode_gr * gfc.channels_out);

	        mean_bits = gfp.VBR_mean_bitrate_kbps * gfp.framesize * 1000;
	        if ((gfc.substep_shaping & 1) != 0)
	            mean_bits *= 1.09;
	        mean_bits /= gfp.out_samplerate;
	        mean_bits -= gfc.sideinfo_len * 8;
	        mean_bits /= (gfc.mode_gr * gfc.channels_out);

	        /**
	         * <PRE>
	         *           res_factor is the percentage of the target bitrate that should
	         *           be used on average.  the remaining bits are added to the
	         *           bitreservoir and used for difficult to encode frames.
	         *
	         *           Since we are tracking the average bitrate, we should adjust
	         *           res_factor "on the fly", increasing it if the average bitrate
	         *           is greater than the requested bitrate, and decreasing it
	         *           otherwise.  Reasonable ranges are from .9 to 1.0
	         *
	         *           Until we get the above suggestion working, we use the following
	         *           tuning:
	         *           compression ratio    res_factor
	         *           5.5  (256kbps)         1.0      no need for bitreservoir
	         *           11   (128kbps)         .93      7% held for reservoir
	         *
	         *           with linear interpolation for other values.
	         * </PRE>
	         */
	        res_factor = .93 + .07 * (11.0 - gfp.compression_ratio)
	            / (11.0 - 5.5);
	        if (res_factor < .90)
	            res_factor = .90;
	        if (res_factor > 1.00)
	            res_factor = 1.00;

	        for (gr = 0; gr < gfc.mode_gr; gr++) {
	            var sum = 0;
	            for (ch = 0; ch < gfc.channels_out; ch++) {
	                targ_bits[gr][ch] = (int)(res_factor * mean_bits);

	                if (pe[gr][ch] > 700) {
	                    var add_bits = (int)((pe[gr][ch] - 700) / 1.4);

	                    var cod_info = l3_side.tt[gr][ch];
	                    targ_bits[gr][ch] = (int)(res_factor * mean_bits);

	                    /* short blocks use a little extra, no matter what the pe */
	                    if (cod_info.block_type == Encoder.SHORT_TYPE) {
	                        if (add_bits < mean_bits / 2)
	                            add_bits = mean_bits / 2;
	                    }
	                    /* at most increase bits by 1.5*average */
	                    if (add_bits > mean_bits * 3 / 2)
	                        add_bits = mean_bits * 3 / 2;
	                    else if (add_bits < 0)
	                        add_bits = 0;

	                    targ_bits[gr][ch] += add_bits;
	                }
	                if (targ_bits[gr][ch] > LameInternalFlags.MAX_BITS_PER_CHANNEL) {
	                    targ_bits[gr][ch] = LameInternalFlags.MAX_BITS_PER_CHANNEL;
	                }
	                sum += targ_bits[gr][ch];
	            }
	            /* for ch */
	            if (sum > LameInternalFlags.MAX_BITS_PER_GRANULE) {
	                for (ch = 0; ch < gfc.channels_out; ++ch) {
	                    targ_bits[gr][ch] *= LameInternalFlags.MAX_BITS_PER_GRANULE;
	                    targ_bits[gr][ch] /= sum;
	                }
	            }
	        }
	        /* for gr */

	        if (gfc.mode_ext == Encoder.MPG_MD_MS_LR)
	            for (gr = 0; gr < gfc.mode_gr; gr++) {
	                qupvt.reduce_side(targ_bits[gr], ms_ener_ratio[gr], mean_bits
	                    * gfc.channels_out,
	                    LameInternalFlags.MAX_BITS_PER_GRANULE);
	            }

	        /*
	         * sum target bits
	         */
	        totbits = 0;
	        for (gr = 0; gr < gfc.mode_gr; gr++) {
	            for (ch = 0; ch < gfc.channels_out; ch++) {
	                if (targ_bits[gr][ch] > LameInternalFlags.MAX_BITS_PER_CHANNEL)
	                    targ_bits[gr][ch] = LameInternalFlags.MAX_BITS_PER_CHANNEL;
	                totbits += targ_bits[gr][ch];
	            }
	        }

	        /*
	         * repartion target bits if needed
	         */
	        if (totbits > max_frame_bits[0]) {
	            for (gr = 0; gr < gfc.mode_gr; gr++) {
	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    targ_bits[gr][ch] *= max_frame_bits[0];
	                    targ_bits[gr][ch] /= totbits;
	                }
	            }
	        }
	    }
	    this.lame_encode_mp3_frame = function (gfp, inbuf_l, inbuf_r, mp3buf, mp3bufPos, mp3buf_size) {
	        var mp3count;
	        var masking_LR = new_array_n([2, 2]);
	        /*
	         * LR masking &
	         * energy
	         */
	        masking_LR[0][0] = new III_psy_ratio();
	        masking_LR[0][1] = new III_psy_ratio();
	        masking_LR[1][0] = new III_psy_ratio();
	        masking_LR[1][1] = new III_psy_ratio();
	        var masking_MS = new_array_n([2, 2]);
	        /* MS masking & energy */
	        masking_MS[0][0] = new III_psy_ratio();
	        masking_MS[0][1] = new III_psy_ratio();
	        masking_MS[1][0] = new III_psy_ratio();
	        masking_MS[1][1] = new III_psy_ratio();
	        //III_psy_ratio masking[][];
	        var masking;
	        /* pointer to selected maskings */
	        var inbuf = [null, null];
	        var gfc = gfp.internal_flags;

	        var tot_ener = new_float_n([2, 4]);
	        var ms_ener_ratio = [.5, .5];
	        var pe = [[0., 0.], [0., 0.]];
	        var pe_MS = [[0., 0.], [0., 0.]];

	//float[][] pe_use;
	        var pe_use;

	        var ch, gr;

	        inbuf[0] = inbuf_l;
	        inbuf[1] = inbuf_r;

	        if (gfc.lame_encode_frame_init == 0) {
	            /* first run? */
	            lame_encode_frame_init(gfp, inbuf);

	        }

	        /********************** padding *****************************/
	        /**
	         * <PRE>
	         * padding method as described in
	         * "MPEG-Layer3 / Bitstream Syntax and Decoding"
	         * by Martin Sieler, Ralph Sperschneider
	         *
	         * note: there is no padding for the very first frame
	         *
	         * Robert Hegemann 2000-06-22
	         * </PRE>
	         */
	        gfc.padding = 0;
	        if ((gfc.slot_lag -= gfc.frac_SpF) < 0) {
	            gfc.slot_lag += gfp.out_samplerate;
	            gfc.padding = 1;
	        }

	        /****************************************
	         * Stage 1: psychoacoustic model *
	         ****************************************/

	        if (gfc.psymodel != 0) {
	            /*
	             * psychoacoustic model psy model has a 1 granule (576) delay that
	             * we must compensate for (mt 6/99).
	             */
	            var ret;
	            var bufp = [null, null];
	            /* address of beginning of left & right granule */
	            var bufpPos = 0;
	            /* address of beginning of left & right granule */
	            var blocktype = new_int(2);

	            for (gr = 0; gr < gfc.mode_gr; gr++) {

	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    bufp[ch] = inbuf[ch];
	                    bufpPos = 576 + gr * 576 - Encoder.FFTOFFSET;
	                }
	                if (gfp.VBR == VbrMode.vbr_mtrh || gfp.VBR == VbrMode.vbr_mt) {
	                    ret = psy.L3psycho_anal_vbr(gfp, bufp, bufpPos, gr,
	                        masking_LR, masking_MS, pe[gr], pe_MS[gr],
	                        tot_ener[gr], blocktype);
	                } else {
	                    ret = psy.L3psycho_anal_ns(gfp, bufp, bufpPos, gr,
	                        masking_LR, masking_MS, pe[gr], pe_MS[gr],
	                        tot_ener[gr], blocktype);
	                }
	                if (ret != 0)
	                    return -4;

	                if (gfp.mode == MPEGMode.JOINT_STEREO) {
	                    ms_ener_ratio[gr] = tot_ener[gr][2] + tot_ener[gr][3];
	                    if (ms_ener_ratio[gr] > 0)
	                        ms_ener_ratio[gr] = tot_ener[gr][3] / ms_ener_ratio[gr];
	                }

	                /* block type flags */
	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    var cod_info = gfc.l3_side.tt[gr][ch];
	                    cod_info.block_type = blocktype[ch];
	                    cod_info.mixed_block_flag = 0;
	                }
	            }
	        } else {
	            /* no psy model */
	            for (gr = 0; gr < gfc.mode_gr; gr++)
	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    gfc.l3_side.tt[gr][ch].block_type = Encoder.NORM_TYPE;
	                    gfc.l3_side.tt[gr][ch].mixed_block_flag = 0;
	                    pe_MS[gr][ch] = pe[gr][ch] = 700;
	                }
	        }

	        /* auto-adjust of ATH, useful for low volume */
	        adjust_ATH(gfc);

	        /****************************************
	         * Stage 2: MDCT *
	         ****************************************/

	        /* polyphase filtering / mdct */
	        newMDCT.mdct_sub48(gfc, inbuf[0], inbuf[1]);

	        /****************************************
	         * Stage 3: MS/LR decision *
	         ****************************************/

	        /* Here will be selected MS or LR coding of the 2 stereo channels */
	        gfc.mode_ext = Encoder.MPG_MD_LR_LR;

	        if (gfp.force_ms) {
	            gfc.mode_ext = Encoder.MPG_MD_MS_LR;
	        } else if (gfp.mode == MPEGMode.JOINT_STEREO) {
	            /*
	             * ms_ratio = is scaled, for historical reasons, to look like a
	             * ratio of side_channel / total. 0 = signal is 100% mono .5 = L & R
	             * uncorrelated
	             */

	            /**
	             * <PRE>
	             * [0] and [1] are the results for the two granules in MPEG-1,
	             * in MPEG-2 it's only a faked averaging of the same value
	             * _prev is the value of the last granule of the previous frame
	             * _next is the value of the first granule of the next frame
	             * </PRE>
	             */

	            var sum_pe_MS = 0.;
	            var sum_pe_LR = 0.;
	            for (gr = 0; gr < gfc.mode_gr; gr++) {
	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    sum_pe_MS += pe_MS[gr][ch];
	                    sum_pe_LR += pe[gr][ch];
	                }
	            }

	            /* based on PE: M/S coding would not use much more bits than L/R */
	            if (sum_pe_MS <= 1.00 * sum_pe_LR) {

	                var gi0 = gfc.l3_side.tt[0];
	                var gi1 = gfc.l3_side.tt[gfc.mode_gr - 1];

	                if (gi0[0].block_type == gi0[1].block_type
	                    && gi1[0].block_type == gi1[1].block_type) {

	                    gfc.mode_ext = Encoder.MPG_MD_MS_LR;
	                }
	            }
	        }

	        /* bit and noise allocation */
	        if (gfc.mode_ext == MPG_MD_MS_LR) {
	            masking = masking_MS;
	            /* use MS masking */
	            pe_use = pe_MS;
	        } else {
	            masking = masking_LR;
	            /* use LR masking */
	            pe_use = pe;
	        }

	        /* copy data for MP3 frame analyzer */
	        if (gfp.analysis && gfc.pinfo != null) {
	            for (gr = 0; gr < gfc.mode_gr; gr++) {
	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    gfc.pinfo.ms_ratio[gr] = gfc.ms_ratio[gr];
	                    gfc.pinfo.ms_ener_ratio[gr] = ms_ener_ratio[gr];
	                    gfc.pinfo.blocktype[gr][ch] = gfc.l3_side.tt[gr][ch].block_type;
	                    gfc.pinfo.pe[gr][ch] = pe_use[gr][ch];
	                    System.arraycopy(gfc.l3_side.tt[gr][ch].xr, 0,
	                        gfc.pinfo.xr[gr][ch], 0, 576);
	                    /*
	                     * in psymodel, LR and MS data was stored in pinfo. switch
	                     * to MS data:
	                     */
	                    if (gfc.mode_ext == MPG_MD_MS_LR) {
	                        gfc.pinfo.ers[gr][ch] = gfc.pinfo.ers[gr][ch + 2];
	                        System.arraycopy(gfc.pinfo.energy[gr][ch + 2], 0,
	                            gfc.pinfo.energy[gr][ch], 0,
	                            gfc.pinfo.energy[gr][ch].length);
	                    }
	                }
	            }
	        }

	        /****************************************
	         * Stage 4: quantization loop *
	         ****************************************/

	        if (gfp.VBR == VbrMode.vbr_off || gfp.VBR == VbrMode.vbr_abr) {

	            var i;
	            var f;

	            for (i = 0; i < 18; i++)
	                gfc.nsPsy.pefirbuf[i] = gfc.nsPsy.pefirbuf[i + 1];

	            f = 0.0;
	            for (gr = 0; gr < gfc.mode_gr; gr++)
	                for (ch = 0; ch < gfc.channels_out; ch++)
	                    f += pe_use[gr][ch];
	            gfc.nsPsy.pefirbuf[18] = f;

	            f = gfc.nsPsy.pefirbuf[9];
	            for (i = 0; i < 9; i++)
	                f += (gfc.nsPsy.pefirbuf[i] + gfc.nsPsy.pefirbuf[18 - i])
	                    * Encoder.fircoef[i];

	            f = (670 * 5 * gfc.mode_gr * gfc.channels_out) / f;
	            for (gr = 0; gr < gfc.mode_gr; gr++) {
	                for (ch = 0; ch < gfc.channels_out; ch++) {
	                    pe_use[gr][ch] *= f;
	                }
	            }
	        }
	        gfc.iteration_loop.iteration_loop(gfp, pe_use, ms_ener_ratio, masking);

	        /****************************************
	         * Stage 5: bitstream formatting *
	         ****************************************/

	        /* write the frame to the bitstream */
	        bs.format_bitstream(gfp);

	        /* copy mp3 bit buffer into array */
	        mp3count = bs.copy_buffer(gfc, mp3buf, mp3bufPos, mp3buf_size, 1);

	        if (gfp.bWriteVbrTag)
	            vbr.addVbrFrame(gfp);

	        if (gfp.analysis && gfc.pinfo != null) {
	            for (ch = 0; ch < gfc.channels_out; ch++) {
	                var j;
	                for (j = 0; j < FFTOFFSET; j++)
	                    gfc.pinfo.pcmdata[ch][j] = gfc.pinfo.pcmdata[ch][j
	                    + gfp.framesize];
	                for (j = FFTOFFSET; j < 1600; j++) {
	                    gfc.pinfo.pcmdata[ch][j] = inbuf[ch][j - FFTOFFSET];
	                }
	            }
	            qupvt.set_frame_pinfo(gfp, masking);
	        }

	        updateStats(gfc);

	        return mp3count;
	    }
	    function compute_ffts(gfp, fftenergy, fftenergy_s, wsamp_l, wsamp_lPos, wsamp_s, wsamp_sPos, gr_out, chn, buffer, bufPos) {
	    function mask_add(m1, m2, kk, b, gfc, shortblock) {
	    function compute_masking_s(gfp, fftenergy_s, eb, thr, chn, sblock) {
	    this.L3psycho_anal_ns = function (gfp, buffer, bufPos, gr_out, masking_ratio, masking_MS_ratio, percep_entropy, percep_MS_entropy, energy, blocktype_d) {
	        /*
	         * to get a good cache performance, one has to think about the sequence,
	         * in which the variables are used.
	         */
	        var gfc = gfp.internal_flags;

	        /* fft and energy calculation */
	        var wsamp_L = new_float_n([2, Encoder.BLKSIZE]);
	        var wsamp_S = new_float_n([2, 3, Encoder.BLKSIZE_s]);

	        /* convolution */
	        var eb_l = new_float(Encoder.CBANDS + 1);
	        var eb_s = new_float(Encoder.CBANDS + 1);
	        var thr = new_float(Encoder.CBANDS + 2);

	        /* block type */
	        var blocktype = new_int(2), uselongblock = new_int(2);

	        /* usual variables like loop indices, etc.. */
	        var numchn, chn;
	        var b, i, j, k;
	        var sb, sblock;

	        /* variables used for --nspsytune */
	        var ns_hpfsmpl = new_float_n([2, 576]);
	        var pcfact;
	        var mask_idx_l = new_int(Encoder.CBANDS + 2), mask_idx_s = new_int(Encoder.CBANDS + 2);

	        Arrays.fill(mask_idx_s, 0);

	        numchn = gfc.channels_out;
	        /* chn=2 and 3 = Mid and Side channels */
	        if (gfp.mode == MPEGMode.JOINT_STEREO)
	            numchn = 4;

	        if (gfp.VBR == VbrMode.vbr_off)
	            pcfact = gfc.ResvMax == 0 ? 0 : ( gfc.ResvSize)
	            / gfc.ResvMax * 0.5;
	        else if (gfp.VBR == VbrMode.vbr_rh || gfp.VBR == VbrMode.vbr_mtrh
	            || gfp.VBR == VbrMode.vbr_mt) {
	            pcfact = 0.6;
	        } else
	            pcfact = 1.0;

	        /**********************************************************************
	         * Apply HPF of fs/4 to the input signal. This is used for attack
	         * detection / handling.
	         **********************************************************************/
	        /* Don't copy the input buffer into a temporary buffer */
	        /* unroll the loop 2 times */
	        for (chn = 0; chn < gfc.channels_out; chn++) {
	            /* apply high pass filter of fs/4 */
	            var firbuf = buffer[chn];
	            var firbufPos = bufPos + 576 - 350 - NSFIRLEN + 192;
	            for (i = 0; i < 576; i++) {
	                var sum1, sum2;
	                sum1 = firbuf[firbufPos + i + 10];
	                sum2 = 0.0;
	                for (j = 0; j < ((NSFIRLEN - 1) / 2) - 1; j += 2) {
	                    sum1 += fircoef[j]
	                        * (firbuf[firbufPos + i + j] + firbuf[firbufPos + i
	                        + NSFIRLEN - j]);
	                    sum2 += fircoef[j + 1]
	                        * (firbuf[firbufPos + i + j + 1] + firbuf[firbufPos
	                        + i + NSFIRLEN - j - 1]);
	                }
	                ns_hpfsmpl[chn][i] = sum1 + sum2;
	            }
	            masking_ratio[gr_out][chn].en.assign(gfc.en[chn]);
	            masking_ratio[gr_out][chn].thm.assign(gfc.thm[chn]);
	            if (numchn > 2) {
	                /* MS maskings */
	                /* percep_MS_entropy [chn-2] = gfc . pe [chn]; */
	                masking_MS_ratio[gr_out][chn].en.assign(gfc.en[chn + 2]);
	                masking_MS_ratio[gr_out][chn].thm.assign(gfc.thm[chn + 2]);
	            }
	        }

	        for (chn = 0; chn < numchn; chn++) {
	            var wsamp_l;
	            var wsamp_s;
	            var en_subshort = new_float(12);
	            var en_short = [0, 0, 0, 0];
	            var attack_intensity = new_float(12);
	            var ns_uselongblock = 1;
	            var attackThreshold;
	            var max = new_float(Encoder.CBANDS), avg = new_float(Encoder.CBANDS);
	            var ns_attacks = [0, 0, 0, 0];
	            var fftenergy = new_float(Encoder.HBLKSIZE);
	            var fftenergy_s = new_float_n([3, Encoder.HBLKSIZE_s]);

	            /*
	             * rh 20040301: the following loops do access one off the limits so
	             * I increase the array dimensions by one and initialize the
	             * accessed values to zero
	             */

	            /***************************************************************
	             * determine the block type (window type)
	             ***************************************************************/
	            /* calculate energies of each sub-shortblocks */
	            for (i = 0; i < 3; i++) {
	                en_subshort[i] = gfc.nsPsy.last_en_subshort[chn][i + 6];
	                attack_intensity[i] = en_subshort[i]
	                    / gfc.nsPsy.last_en_subshort[chn][i + 4];
	                en_short[0] += en_subshort[i];
	            }

	            if (chn == 2) {
	                for (i = 0; i < 576; i++) {
	                    var l, r;
	                    l = ns_hpfsmpl[0][i];
	                    r = ns_hpfsmpl[1][i];
	                    ns_hpfsmpl[0][i] = l + r;
	                    ns_hpfsmpl[1][i] = l - r;
	                }
	            }
	            {
	                var pf = ns_hpfsmpl[chn & 1];
	                var pfPos = 0;
	                for (i = 0; i < 9; i++) {
	                    var pfe = pfPos + 576 / 9;
	                    var p = 1.;
	                    for (; pfPos < pfe; pfPos++)
	                        if (p < Math.abs(pf[pfPos]))
	                            p = Math.abs(pf[pfPos]);

	                    gfc.nsPsy.last_en_subshort[chn][i] = en_subshort[i + 3] = p;
	                    en_short[1 + i / 3] += p;
	                    if (p > en_subshort[i + 3 - 2]) {
	                        p = p / en_subshort[i + 3 - 2];
	                    } else if (en_subshort[i + 3 - 2] > p * 10.0) {
	                        p = en_subshort[i + 3 - 2] / (p * 10.0);
	                    } else
	                        p = 0.0;
	                    attack_intensity[i + 3] = p;
	                }
	            }

	            if (gfp.analysis) {
	                var x = attack_intensity[0];
	                for (i = 1; i < 12; i++)
	                    if (x < attack_intensity[i])
	                        x = attack_intensity[i];
	                gfc.pinfo.ers[gr_out][chn] = gfc.pinfo.ers_save[chn];
	                gfc.pinfo.ers_save[chn] = x;
	            }

	            /* compare energies between sub-shortblocks */
	            attackThreshold = (chn == 3) ? gfc.nsPsy.attackthre_s
	                : gfc.nsPsy.attackthre;
	            for (i = 0; i < 12; i++)
	                if (0 == ns_attacks[i / 3]
	                    && attack_intensity[i] > attackThreshold)
	                    ns_attacks[i / 3] = (i % 3) + 1;

	            /*
	             * should have energy change between short blocks, in order to avoid
	             * periodic signals
	             */
	            for (i = 1; i < 4; i++) {
	                var ratio;
	                if (en_short[i - 1] > en_short[i]) {
	                    ratio = en_short[i - 1] / en_short[i];
	                } else {
	                    ratio = en_short[i] / en_short[i - 1];
	                }
	                if (ratio < 1.7) {
	                    ns_attacks[i] = 0;
	                    if (i == 1)
	                        ns_attacks[0] = 0;
	                }
	            }

	            if (ns_attacks[0] != 0 && gfc.nsPsy.lastAttacks[chn] != 0)
	                ns_attacks[0] = 0;

	            if (gfc.nsPsy.lastAttacks[chn] == 3
	                || (ns_attacks[0] + ns_attacks[1] + ns_attacks[2] + ns_attacks[3]) != 0) {
	                ns_uselongblock = 0;

	                if (ns_attacks[1] != 0 && ns_attacks[0] != 0)
	                    ns_attacks[1] = 0;
	                if (ns_attacks[2] != 0 && ns_attacks[1] != 0)
	                    ns_attacks[2] = 0;
	                if (ns_attacks[3] != 0 && ns_attacks[2] != 0)
	                    ns_attacks[3] = 0;
	            }

	            if (chn < 2) {
	                uselongblock[chn] = ns_uselongblock;
	            } else {
	                if (ns_uselongblock == 0) {
	                    uselongblock[0] = uselongblock[1] = 0;
	                }
	            }

	            /*
	             * there is a one granule delay. Copy maskings computed last call
	             * into masking_ratio to return to calling program.
	             */
	            energy[chn] = gfc.tot_ener[chn];

	            /*********************************************************************
	             * compute FFTs
	             *********************************************************************/
	            wsamp_s = wsamp_S;
	            wsamp_l = wsamp_L;
	            compute_ffts(gfp, fftenergy, fftenergy_s, wsamp_l, (chn & 1),
	                wsamp_s, (chn & 1), gr_out, chn, buffer, bufPos);

	            /*********************************************************************
	             * Calculate the energy and the tonality of each partition.
	             *********************************************************************/
	            calc_energy(gfc, fftenergy, eb_l, max, avg);
	            calc_mask_index_l(gfc, max, avg, mask_idx_l);
	            /* compute masking thresholds for short blocks */
	            for (sblock = 0; sblock < 3; sblock++) {
	                var enn, thmm;
	                compute_masking_s(gfp, fftenergy_s, eb_s, thr, chn, sblock);
	                convert_partition2scalefac_s(gfc, eb_s, thr, chn, sblock);
	                /**** short block pre-echo control ****/
	                for (sb = 0; sb < Encoder.SBMAX_s; sb++) {
	                    thmm = gfc.thm[chn].s[sb][sblock];

	                    thmm *= NS_PREECHO_ATT0;
	                    if (ns_attacks[sblock] >= 2 || ns_attacks[sblock + 1] == 1) {
	                        var idx = (sblock != 0) ? sblock - 1 : 2;
	                        var p = NS_INTERP(gfc.thm[chn].s[sb][idx], thmm,
	                            NS_PREECHO_ATT1 * pcfact);
	                        thmm = Math.min(thmm, p);
	                    }

	                    if (ns_attacks[sblock] == 1) {
	                        var idx = (sblock != 0) ? sblock - 1 : 2;
	                        var p = NS_INTERP(gfc.thm[chn].s[sb][idx], thmm,
	                            NS_PREECHO_ATT2 * pcfact);
	                        thmm = Math.min(thmm, p);
	                    } else if ((sblock != 0 && ns_attacks[sblock - 1] == 3)
	                        || (sblock == 0 && gfc.nsPsy.lastAttacks[chn] == 3)) {
	                        var idx = (sblock != 2) ? sblock + 1 : 0;
	                        var p = NS_INTERP(gfc.thm[chn].s[sb][idx], thmm,
	                            NS_PREECHO_ATT2 * pcfact);
	                        thmm = Math.min(thmm, p);
	                    }

	                    /* pulse like signal detection for fatboy.wav and so on */
	                    enn = en_subshort[sblock * 3 + 3]
	                        + en_subshort[sblock * 3 + 4]
	                        + en_subshort[sblock * 3 + 5];
	                    if (en_subshort[sblock * 3 + 5] * 6 < enn) {
	                        thmm *= 0.5;
	                        if (en_subshort[sblock * 3 + 4] * 6 < enn)
	                            thmm *= 0.5;
	                    }

	                    gfc.thm[chn].s[sb][sblock] = thmm;
	                }
	            }
	            gfc.nsPsy.lastAttacks[chn] = ns_attacks[2];

	            /*********************************************************************
	             * convolve the partitioned energy and unpredictability with the
	             * spreading function, s3_l[b][k]
	             ********************************************************************/
	            k = 0;
	            {
	                for (b = 0; b < gfc.npart_l; b++) {
	                    /*
	                     * convolve the partitioned energy with the spreading
	                     * function
	                     */
	                    var kk = gfc.s3ind[b][0];
	                    var eb2 = eb_l[kk] * tab[mask_idx_l[kk]];
	                    var ecb = gfc.s3_ll[k++] * eb2;
	                    while (++kk <= gfc.s3ind[b][1]) {
	                        eb2 = eb_l[kk] * tab[mask_idx_l[kk]];
	                        ecb = mask_add(ecb, gfc.s3_ll[k++] * eb2, kk, kk - b,
	                            gfc, 0);
	                    }
	                    ecb *= 0.158489319246111;
	                    /* pow(10,-0.8) */

	                    /**** long block pre-echo control ****/
	                    /**
	                     * <PRE>
	                     * dont use long block pre-echo control if previous granule was
	                     * a short block.  This is to avoid the situation:
	                     * frame0:  quiet (very low masking)
	                     * frame1:  surge  (triggers short blocks)
	                     * frame2:  regular frame.  looks like pre-echo when compared to
	                     *          frame0, but all pre-echo was in frame1.
	                     * </PRE>
	                     */
	                    /*
	                     * chn=0,1 L and R channels
	                     *
	                     * chn=2,3 S and M channels.
	                     */

	                    if (gfc.blocktype_old[chn & 1] == Encoder.SHORT_TYPE)
	                        thr[b] = ecb;
	                    else
	                        thr[b] = NS_INTERP(
	                            Math.min(ecb, Math.min(rpelev
	                                * gfc.nb_1[chn][b], rpelev2
	                                * gfc.nb_2[chn][b])), ecb, pcfact);

	                    gfc.nb_2[chn][b] = gfc.nb_1[chn][b];
	                    gfc.nb_1[chn][b] = ecb;
	                }
	            }
	            for (; b <= Encoder.CBANDS; ++b) {
	                eb_l[b] = 0;
	                thr[b] = 0;
	            }
	            /* compute masking thresholds for long blocks */
	            convert_partition2scalefac_l(gfc, eb_l, thr, chn);
	        }
	        /* end loop over chn */

	        if (gfp.mode == MPEGMode.STEREO || gfp.mode == MPEGMode.JOINT_STEREO) {
	            if (gfp.interChRatio > 0.0) {
	                calc_interchannel_masking(gfp, gfp.interChRatio);
	            }
	        }

	        if (gfp.mode == MPEGMode.JOINT_STEREO) {
	            var msfix;
	            msfix1(gfc);
	            msfix = gfp.msfix;
	            if (Math.abs(msfix) > 0.0)
	                ns_msfix(gfc, msfix, gfp.ATHlower * gfc.ATH.adjust);
	        }

	        /***************************************************************
	         * determine final block type
	         ***************************************************************/
	        block_type_set(gfp, uselongblock, blocktype_d, blocktype);

	        /*********************************************************************
	         * compute the value of PE to return ... no delay and advance
	         *********************************************************************/
	        for (chn = 0; chn < numchn; chn++) {
	            var ppe;
	            var ppePos = 0;
	            var type;
	            var mr;

	            if (chn > 1) {
	                ppe = percep_MS_entropy;
	                ppePos = -2;
	                type = Encoder.NORM_TYPE;
	                if (blocktype_d[0] == Encoder.SHORT_TYPE
	                    || blocktype_d[1] == Encoder.SHORT_TYPE)
	                    type = Encoder.SHORT_TYPE;
	                mr = masking_MS_ratio[gr_out][chn - 2];
	            } else {
	                ppe = percep_entropy;
	                ppePos = 0;
	                type = blocktype_d[chn];
	                mr = masking_ratio[gr_out][chn];
	            }

	            if (type == Encoder.SHORT_TYPE)
	                ppe[ppePos + chn] = pecalc_s(mr, gfc.masking_lower);
	            else
	                ppe[ppePos + chn] = pecalc_l(mr, gfc.masking_lower);

	            if (gfp.analysis)
	                gfc.pinfo.pe[gr_out][chn] = ppe[ppePos + chn];

	        }
	        return 0;
	    }
	    function vbrpsy_compute_fft_l(gfp, buffer, bufPos, chn, gr_out, fftenergy, wsamp_l, wsamp_lPos) {
	    function vbrpsy_compute_fft_s(gfp, buffer, bufPos, chn, sblock, fftenergy_s, wsamp_s, wsamp_sPos) {
	    function vbrpsy_attack_detection(gfp, buffer, bufPos, gr_out, masking_ratio, masking_MS_ratio, energy, sub_short_factor, ns_attacks, uselongblock) {
	        var ns_hpfsmpl = new_float_n([2, 576]);
	        var gfc = gfp.internal_flags;
	        var n_chn_out = gfc.channels_out;
	        /* chn=2 and 3 = Mid and Side channels */
	        var n_chn_psy = (gfp.mode == MPEGMode.JOINT_STEREO) ? 4 : n_chn_out;
	        /* Don't copy the input buffer into a temporary buffer */
	        /* unroll the loop 2 times */
	        for (var chn = 0; chn < n_chn_out; chn++) {
	            /* apply high pass filter of fs/4 */
	            firbuf = buffer[chn];
	            var firbufPos = bufPos + 576 - 350 - NSFIRLEN + 192;
	            for (var i = 0; i < 576; i++) {
	                var sum1, sum2;
	                sum1 = firbuf[firbufPos + i + 10];
	                sum2 = 0.0;
	                for (var j = 0; j < ((NSFIRLEN - 1) / 2) - 1; j += 2) {
	                    sum1 += fircoef_[j]
	                        * (firbuf[firbufPos + i + j] + firbuf[firbufPos + i
	                        + NSFIRLEN - j]);
	                    sum2 += fircoef_[j + 1]
	                        * (firbuf[firbufPos + i + j + 1] + firbuf[firbufPos
	                        + i + NSFIRLEN - j - 1]);
	                }
	                ns_hpfsmpl[chn][i] = sum1 + sum2;
	            }
	            masking_ratio[gr_out][chn].en.assign(gfc.en[chn]);
	            masking_ratio[gr_out][chn].thm.assign(gfc.thm[chn]);
	            if (n_chn_psy > 2) {
	                /* MS maskings */
	                /* percep_MS_entropy [chn-2] = gfc . pe [chn]; */
	                masking_MS_ratio[gr_out][chn].en.assign(gfc.en[chn + 2]);
	                masking_MS_ratio[gr_out][chn].thm.assign(gfc.thm[chn + 2]);
	            }
	        }
	        for (var chn = 0; chn < n_chn_psy; chn++) {
	            var attack_intensity = new_float(12);
	            var en_subshort = new_float(12);
	            var en_short = [0, 0, 0, 0];
	            var pf = ns_hpfsmpl[chn & 1];
	            var pfPos = 0;
	            var attackThreshold = (chn == 3) ? gfc.nsPsy.attackthre_s
	                : gfc.nsPsy.attackthre;
	            var ns_uselongblock = 1;

	            if (chn == 2) {
	                for (var i = 0, j = 576; j > 0; ++i, --j) {
	                    var l = ns_hpfsmpl[0][i];
	                    var r = ns_hpfsmpl[1][i];
	                    ns_hpfsmpl[0][i] = l + r;
	                    ns_hpfsmpl[1][i] = l - r;
	                }
	            }
	            /***************************************************************
	             * determine the block type (window type)
	             ***************************************************************/
	            /* calculate energies of each sub-shortblocks */
	            for (var i = 0; i < 3; i++) {
	                en_subshort[i] = gfc.nsPsy.last_en_subshort[chn][i + 6];
	                attack_intensity[i] = en_subshort[i]
	                    / gfc.nsPsy.last_en_subshort[chn][i + 4];
	                en_short[0] += en_subshort[i];
	            }

	            for (var i = 0; i < 9; i++) {
	                var pfe = pfPos + 576 / 9;
	                var p = 1.;
	                for (; pfPos < pfe; pfPos++)
	                    if (p < Math.abs(pf[pfPos]))
	                        p = Math.abs(pf[pfPos]);

	                gfc.nsPsy.last_en_subshort[chn][i] = en_subshort[i + 3] = p;
	                en_short[1 + i / 3] += p;
	                if (p > en_subshort[i + 3 - 2]) {
	                    p = p / en_subshort[i + 3 - 2];
	                } else if (en_subshort[i + 3 - 2] > p * 10.0) {
	                    p = en_subshort[i + 3 - 2] / (p * 10.0);
	                } else {
	                    p = 0.0;
	                }
	                attack_intensity[i + 3] = p;
	            }
	            /* pulse like signal detection for fatboy.wav and so on */
	            for (var i = 0; i < 3; ++i) {
	                var enn = en_subshort[i * 3 + 3]
	                    + en_subshort[i * 3 + 4] + en_subshort[i * 3 + 5];
	                var factor = 1.;
	                if (en_subshort[i * 3 + 5] * 6 < enn) {
	                    factor *= 0.5;
	                    if (en_subshort[i * 3 + 4] * 6 < enn) {
	                        factor *= 0.5;
	                    }
	                }
	                sub_short_factor[chn][i] = factor;
	            }

	            if (gfp.analysis) {
	                var x = attack_intensity[0];
	                for (var i = 1; i < 12; i++) {
	                    if (x < attack_intensity[i]) {
	                        x = attack_intensity[i];
	                    }
	                }
	                gfc.pinfo.ers[gr_out][chn] = gfc.pinfo.ers_save[chn];
	                gfc.pinfo.ers_save[chn] = x;
	            }

	            /* compare energies between sub-shortblocks */
	            for (var i = 0; i < 12; i++) {
	                if (0 == ns_attacks[chn][i / 3]
	                    && attack_intensity[i] > attackThreshold) {
	                    ns_attacks[chn][i / 3] = (i % 3) + 1;
	                }
	            }

	            /*
	             * should have energy change between short blocks, in order to avoid
	             * periodic signals
	             */
	            /* Good samples to show the effect are Trumpet test songs */
	            /*
	             * GB: tuned (1) to avoid too many short blocks for test sample
	             * TRUMPET
	             */
	            /*
	             * RH: tuned (2) to let enough short blocks through for test sample
	             * FSOL and SNAPS
	             */
	            for (var i = 1; i < 4; i++) {
	                var u = en_short[i - 1];
	                var v = en_short[i];
	                var m = Math.max(u, v);
	                if (m < 40000) { /* (2) */
	                    if (u < 1.7 * v && v < 1.7 * u) { /* (1) */
	                        if (i == 1 && ns_attacks[chn][0] <= ns_attacks[chn][i]) {
	                            ns_attacks[chn][0] = 0;
	                        }
	                        ns_attacks[chn][i] = 0;
	                    }
	                }
	            }

	            if (ns_attacks[chn][0] <= gfc.nsPsy.lastAttacks[chn]) {
	                ns_attacks[chn][0] = 0;
	            }

	            if (gfc.nsPsy.lastAttacks[chn] == 3
	                || (ns_attacks[chn][0] + ns_attacks[chn][1]
	                + ns_attacks[chn][2] + ns_attacks[chn][3]) != 0) {
	                ns_uselongblock = 0;

	                if (ns_attacks[chn][1] != 0 && ns_attacks[chn][0] != 0) {
	                    ns_attacks[chn][1] = 0;
	                }
	                if (ns_attacks[chn][2] != 0 && ns_attacks[chn][1] != 0) {
	                    ns_attacks[chn][2] = 0;
	                }
	                if (ns_attacks[chn][3] != 0 && ns_attacks[chn][2] != 0) {
	                    ns_attacks[chn][3] = 0;
	                }
	            }
	            if (chn < 2) {
	                uselongblock[chn] = ns_uselongblock;
	            } else {
	                if (ns_uselongblock == 0) {
	                    uselongblock[0] = uselongblock[1] = 0;
	                }
	            }

	            /*
	             * there is a one granule delay. Copy maskings computed last call
	             * into masking_ratio to return to calling program.
	             */
	            energy[chn] = gfc.tot_ener[chn];
	        }
	    }
	    function vbrpsy_compute_masking_s(gfp, fftenergy_s, eb, thr, chn, sblock) {
	    function vbrpsy_compute_MS_thresholds(eb, thr, cb_mld, ath_cb, athadjust, msfix, n) {
	    this.L3psycho_anal_vbr = function (gfp, buffer, bufPos, gr_out, masking_ratio, masking_MS_ratio, percep_entropy, percep_MS_entropy, energy, blocktype_d) {
	        var gfc = gfp.internal_flags;

	        /* fft and energy calculation */
	        var wsamp_l;
	        var wsamp_s;
	        var fftenergy = new_float(Encoder.HBLKSIZE);
	        var fftenergy_s = new_float_n([3, Encoder.HBLKSIZE_s]);
	        var wsamp_L = new_float_n([2, Encoder.BLKSIZE]);
	        var wsamp_S = new_float_n([2, 3, Encoder.BLKSIZE_s]);
	        var eb = new_float_n([4, Encoder.CBANDS]), thr = new_float_n([4, Encoder.CBANDS]);
	        var sub_short_factor = new_float_n([4, 3]);
	        var pcfact = 0.6;

	        /* block type */
	        var ns_attacks = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
	            [0, 0, 0, 0]];
	        var uselongblock = new_int(2);

	        /* usual variables like loop indices, etc.. */

	        /* chn=2 and 3 = Mid and Side channels */
	        var n_chn_psy = (gfp.mode == MPEGMode.JOINT_STEREO) ? 4
	            : gfc.channels_out;

	        vbrpsy_attack_detection(gfp, buffer, bufPos, gr_out, masking_ratio,
	            masking_MS_ratio, energy, sub_short_factor, ns_attacks,
	            uselongblock);

	        vbrpsy_compute_block_type(gfp, uselongblock);

	        /* LONG BLOCK CASE */
	        {
	            for (var chn = 0; chn < n_chn_psy; chn++) {
	                var ch01 = chn & 0x01;
	                wsamp_l = wsamp_L;
	                vbrpsy_compute_fft_l(gfp, buffer, bufPos, chn, gr_out,
	                    fftenergy, wsamp_l, ch01);

	                vbrpsy_compute_loudness_approximation_l(gfp, gr_out, chn,
	                    fftenergy);

	                if (uselongblock[ch01] != 0) {
	                    vbrpsy_compute_masking_l(gfc, fftenergy, eb[chn], thr[chn],
	                        chn);
	                } else {
	                    vbrpsy_skip_masking_l(gfc, chn);
	                }
	            }
	            if ((uselongblock[0] + uselongblock[1]) == 2) {
	                /* M/S channel */
	                if (gfp.mode == MPEGMode.JOINT_STEREO) {
	                    vbrpsy_compute_MS_thresholds(eb, thr, gfc.mld_cb_l,
	                        gfc.ATH.cb_l, gfp.ATHlower * gfc.ATH.adjust,
	                        gfp.msfix, gfc.npart_l);
	                }
	            }
	            /* TODO: apply adaptive ATH masking here ?? */
	            for (var chn = 0; chn < n_chn_psy; chn++) {
	                var ch01 = chn & 0x01;
	                if (uselongblock[ch01] != 0) {
	                    convert_partition2scalefac_l(gfc, eb[chn], thr[chn], chn);
	                }
	            }
	        }

	        /* SHORT BLOCKS CASE */
	        {
	            for (var sblock = 0; sblock < 3; sblock++) {
	                for (var chn = 0; chn < n_chn_psy; ++chn) {
	                    var ch01 = chn & 0x01;

	                    if (uselongblock[ch01] != 0) {
	                        vbrpsy_skip_masking_s(gfc, chn, sblock);
	                    } else {
	                        /* compute masking thresholds for short blocks */
	                        wsamp_s = wsamp_S;
	                        vbrpsy_compute_fft_s(gfp, buffer, bufPos, chn, sblock,
	                            fftenergy_s, wsamp_s, ch01);
	                        vbrpsy_compute_masking_s(gfp, fftenergy_s, eb[chn],
	                            thr[chn], chn, sblock);
	                    }
	                }
	                if ((uselongblock[0] + uselongblock[1]) == 0) {
	                    /* M/S channel */
	                    if (gfp.mode == MPEGMode.JOINT_STEREO) {
	                        vbrpsy_compute_MS_thresholds(eb, thr, gfc.mld_cb_s,
	                            gfc.ATH.cb_s, gfp.ATHlower * gfc.ATH.adjust,
	                            gfp.msfix, gfc.npart_s);
	                    }
	                    /* L/R channel */
	                }
	                /* TODO: apply adaptive ATH masking here ?? */
	                for (var chn = 0; chn < n_chn_psy; ++chn) {
	                    var ch01 = chn & 0x01;
	                    if (0 == uselongblock[ch01]) {
	                        convert_partition2scalefac_s(gfc, eb[chn], thr[chn],
	                            chn, sblock);
	                    }
	                }
	            }

	            /**** short block pre-echo control ****/
	            for (var chn = 0; chn < n_chn_psy; chn++) {
	                var ch01 = chn & 0x01;

	                if (uselongblock[ch01] != 0) {
	                    continue;
	                }
	                for (var sb = 0; sb < Encoder.SBMAX_s; sb++) {
	                    var new_thmm = new_float(3);
	                    for (var sblock = 0; sblock < 3; sblock++) {
	                        var thmm = gfc.thm[chn].s[sb][sblock];
	                        thmm *= NS_PREECHO_ATT0;

	                        if (ns_attacks[chn][sblock] >= 2
	                            || ns_attacks[chn][sblock + 1] == 1) {
	                            var idx = (sblock != 0) ? sblock - 1 : 2;
	                            var p = NS_INTERP(gfc.thm[chn].s[sb][idx], thmm,
	                                NS_PREECHO_ATT1 * pcfact);
	                            thmm = Math.min(thmm, p);
	                        } else if (ns_attacks[chn][sblock] == 1) {
	                            var idx = (sblock != 0) ? sblock - 1 : 2;
	                            var p = NS_INTERP(gfc.thm[chn].s[sb][idx], thmm,
	                                NS_PREECHO_ATT2 * pcfact);
	                            thmm = Math.min(thmm, p);
	                        } else if ((sblock != 0 && ns_attacks[chn][sblock - 1] == 3)
	                            || (sblock == 0 && gfc.nsPsy.lastAttacks[chn] == 3)) {
	                            var idx = (sblock != 2) ? sblock + 1 : 0;
	                            var p = NS_INTERP(gfc.thm[chn].s[sb][idx], thmm,
	                                NS_PREECHO_ATT2 * pcfact);
	                            thmm = Math.min(thmm, p);
	                        }

	                        /* pulse like signal detection for fatboy.wav and so on */
	                        thmm *= sub_short_factor[chn][sblock];

	                        new_thmm[sblock] = thmm;
	                    }
	                    for (var sblock = 0; sblock < 3; sblock++) {
	                        gfc.thm[chn].s[sb][sblock] = new_thmm[sblock];
	                    }
	                }
	            }
	        }
	        for (var chn = 0; chn < n_chn_psy; chn++) {
	            gfc.nsPsy.lastAttacks[chn] = ns_attacks[chn][2];
	        }

	        /***************************************************************
	         * determine final block type
	         ***************************************************************/
	        vbrpsy_apply_block_type(gfp, uselongblock, blocktype_d);

	        /*********************************************************************
	         * compute the value of PE to return ... no delay and advance
	         *********************************************************************/
	        for (var chn = 0; chn < n_chn_psy; chn++) {
	            var ppe;
	            var ppePos;
	            var type;
	            var mr;

	            if (chn > 1) {
	                ppe = percep_MS_entropy;
	                ppePos = -2;
	                type = Encoder.NORM_TYPE;
	                if (blocktype_d[0] == Encoder.SHORT_TYPE
	                    || blocktype_d[1] == Encoder.SHORT_TYPE)
	                    type = Encoder.SHORT_TYPE;
	                mr = masking_MS_ratio[gr_out][chn - 2];
	            } else {
	                ppe = percep_entropy;
	                ppePos = 0;
	                type = blocktype_d[chn];
	                mr = masking_ratio[gr_out][chn];
	            }

	            if (type == Encoder.SHORT_TYPE) {
	                ppe[ppePos + chn] = pecalc_s(mr, gfc.masking_lower);
	            } else {
	                ppe[ppePos + chn] = pecalc_l(mr, gfc.masking_lower);
	            }

	            if (gfp.analysis) {
	                gfc.pinfo.pe[gr_out][chn] = ppe[ppePos + chn];
	            }
	        }
	        return 0;
	    }
	    function init_numline(numlines, bo, bm, bval, bval_width, mld, bo_w, sfreq, blksize, scalepos, deltafreq, sbmax) {
	    function init_s3_values(s3ind, npart, bval, bval_width, norm, use_old_s3) {
	    this.psymodel_init = function (gfp) {
	        var gfc = gfp.internal_flags;
	        var i;
	        var useOldS3 = true;
	        var bvl_a = 13, bvl_b = 24;
	        var snr_l_a = 0, snr_l_b = 0;
	        var snr_s_a = -8.25, snr_s_b = -4.5;
	        var bval = new_float(Encoder.CBANDS);
	        var bval_width = new_float(Encoder.CBANDS);
	        var norm = new_float(Encoder.CBANDS);
	        var sfreq = gfp.out_samplerate;

	        switch (gfp.experimentalZ) {
	            default:
	            case 0:
	                useOldS3 = true;
	                break;
	            case 1:
	                useOldS3 = (gfp.VBR == VbrMode.vbr_mtrh || gfp.VBR == VbrMode.vbr_mt) ? false
	                    : true;
	                break;
	            case 2:
	                useOldS3 = false;
	                break;
	            case 3:
	                bvl_a = 8;
	                snr_l_a = -1.75;
	                snr_l_b = -0.0125;
	                snr_s_a = -8.25;
	                snr_s_b = -2.25;
	                break;
	        }
	        gfc.ms_ener_ratio_old = .25;
	        gfc.blocktype_old[0] = gfc.blocktype_old[1] = Encoder.NORM_TYPE;
	        // the vbr header is long blocks

	        for (i = 0; i < 4; ++i) {
	            for (var j = 0; j < Encoder.CBANDS; ++j) {
	                gfc.nb_1[i][j] = 1e20;
	                gfc.nb_2[i][j] = 1e20;
	                gfc.nb_s1[i][j] = gfc.nb_s2[i][j] = 1.0;
	            }
	            for (var sb = 0; sb < Encoder.SBMAX_l; sb++) {
	                gfc.en[i].l[sb] = 1e20;
	                gfc.thm[i].l[sb] = 1e20;
	            }
	            for (var j = 0; j < 3; ++j) {
	                for (var sb = 0; sb < Encoder.SBMAX_s; sb++) {
	                    gfc.en[i].s[sb][j] = 1e20;
	                    gfc.thm[i].s[sb][j] = 1e20;
	                }
	                gfc.nsPsy.lastAttacks[i] = 0;
	            }
	            for (var j = 0; j < 9; j++)
	                gfc.nsPsy.last_en_subshort[i][j] = 10.;
	        }

	        /* init. for loudness approx. -jd 2001 mar 27 */
	        gfc.loudness_sq_save[0] = gfc.loudness_sq_save[1] = 0.0;

	        /*************************************************************************
	         * now compute the psychoacoustic model specific constants
	         ************************************************************************/
	        /* compute numlines, bo, bm, bval, bval_width, mld */

	        gfc.npart_l = init_numline(gfc.numlines_l, gfc.bo_l, gfc.bm_l, bval,
	            bval_width, gfc.mld_l, gfc.PSY.bo_l_weight, sfreq,
	            Encoder.BLKSIZE, gfc.scalefac_band.l, Encoder.BLKSIZE
	            / (2.0 * 576), Encoder.SBMAX_l);
	        /* compute the spreading function */
	        for (i = 0; i < gfc.npart_l; i++) {
	            var snr = snr_l_a;
	            if (bval[i] >= bvl_a) {
	                snr = snr_l_b * (bval[i] - bvl_a) / (bvl_b - bvl_a) + snr_l_a
	                    * (bvl_b - bval[i]) / (bvl_b - bvl_a);
	            }
	            norm[i] = Math.pow(10.0, snr / 10.0);
	            if (gfc.numlines_l[i] > 0) {
	                gfc.rnumlines_l[i] = 1.0 / gfc.numlines_l[i];
	            } else {
	                gfc.rnumlines_l[i] = 0;
	            }
	        }
	        gfc.s3_ll = init_s3_values(gfc.s3ind, gfc.npart_l, bval, bval_width,
	            norm, useOldS3);

	        /* compute long block specific values, ATH and MINVAL */
	        var j = 0;
	        for (i = 0; i < gfc.npart_l; i++) {
	            var x;

	            /* ATH */
	            x = Float.MAX_VALUE;
	            for (var k = 0; k < gfc.numlines_l[i]; k++, j++) {
	                var freq = sfreq * j / (1000.0 * Encoder.BLKSIZE);
	                var level;
	                /*
	                 * ATH below 100 Hz constant, not further climbing
	                 */
	                level = this.ATHformula(freq * 1000, gfp) - 20;
	                // scale to FFT units; returned value is in dB
	                level = Math.pow(10., 0.1 * level);
	                // convert from dB . energy
	                level *= gfc.numlines_l[i];
	                if (x > level)
	                    x = level;
	            }
	            gfc.ATH.cb_l[i] = x;

	            /*
	             * MINVAL. For low freq, the strength of the masking is limited by
	             * minval this is an ISO MPEG1 thing, dont know if it is really
	             * needed
	             */
	            /*
	             * FIXME: it does work to reduce low-freq problems in S53-Wind-Sax
	             * and lead-voice samples, but introduces some 3 kbps bit bloat too.
	             * TODO: Further refinement of the shape of this hack.
	             */
	            x = -20 + bval[i] * 20 / 10;
	            if (x > 6) {
	                x = 100;
	            }
	            if (x < -15) {
	                x = -15;
	            }
	            x -= 8.;
	            gfc.minval_l[i] = (Math.pow(10.0, x / 10.) * gfc.numlines_l[i]);
	        }

	        /************************************************************************
	         * do the same things for short blocks
	         ************************************************************************/
	        gfc.npart_s = init_numline(gfc.numlines_s, gfc.bo_s, gfc.bm_s, bval,
	            bval_width, gfc.mld_s, gfc.PSY.bo_s_weight, sfreq,
	            Encoder.BLKSIZE_s, gfc.scalefac_band.s, Encoder.BLKSIZE_s
	            / (2.0 * 192), Encoder.SBMAX_s);

	        /* SNR formula. short block is normalized by SNR. is it still right ? */
	        j = 0;
	        for (i = 0; i < gfc.npart_s; i++) {
	            var x;
	            var snr = snr_s_a;
	            if (bval[i] >= bvl_a) {
	                snr = snr_s_b * (bval[i] - bvl_a) / (bvl_b - bvl_a) + snr_s_a
	                    * (bvl_b - bval[i]) / (bvl_b - bvl_a);
	            }
	            norm[i] = Math.pow(10.0, snr / 10.0);

	            /* ATH */
	            x = Float.MAX_VALUE;
	            for (var k = 0; k < gfc.numlines_s[i]; k++, j++) {
	                var freq = sfreq * j / (1000.0 * Encoder.BLKSIZE_s);
	                var level;
	                /* freq = Min(.1,freq); */
	                /*
	                 * ATH below 100 Hz constant, not
	                 * further climbing
	                 */
	                level = this.ATHformula(freq * 1000, gfp) - 20;
	                // scale to FFT units; returned value is in dB
	                level = Math.pow(10., 0.1 * level);
	                // convert from dB . energy
	                level *= gfc.numlines_s[i];
	                if (x > level)
	                    x = level;
	            }
	            gfc.ATH.cb_s[i] = x;

	            /*
	             * MINVAL. For low freq, the strength of the masking is limited by
	             * minval this is an ISO MPEG1 thing, dont know if it is really
	             * needed
	             */
	            x = (-7.0 + bval[i] * 7.0 / 12.0);
	            if (bval[i] > 12) {
	                x *= 1 + Math.log(1 + x) * 3.1;
	            }
	            if (bval[i] < 12) {
	                x *= 1 + Math.log(1 - x) * 2.3;
	            }
	            if (x < -15) {
	                x = -15;
	            }
	            x -= 8;
	            gfc.minval_s[i] = Math.pow(10.0, x / 10)
	                * gfc.numlines_s[i];
	        }

	        gfc.s3_ss = init_s3_values(gfc.s3ind_s, gfc.npart_s, bval, bval_width,
	            norm, useOldS3);

	        init_mask_add_max_values();
	        fft.init_fft(gfc);

	        /* setup temporal masking */
	        gfc.decay = Math.exp(-1.0 * LOG10
	            / (temporalmask_sustain_sec * sfreq / 192.0));

	        {
	            var msfix;
	            msfix = NS_MSFIX;
	            if ((gfp.exp_nspsytune & 2) != 0)
	                msfix = 1.0;
	            if (Math.abs(gfp.msfix) > 0.0)
	                msfix = gfp.msfix;
	            gfp.msfix = msfix;

	            /*
	             * spread only from npart_l bands. Normally, we use the spreading
	             * function to convolve from npart_l down to npart_l bands
	             */
	            for (var b = 0; b < gfc.npart_l; b++)
	                if (gfc.s3ind[b][1] > gfc.npart_l - 1)
	                    gfc.s3ind[b][1] = gfc.npart_l - 1;
	        }

	        /*
	         * prepare for ATH auto adjustment: we want to decrease the ATH by 12 dB
	         * per second
	         */
	        var frame_duration = (576. * gfc.mode_gr / sfreq);
	        gfc.ATH.decay = Math.pow(10., -12. / 10. * frame_duration);
	        gfc.ATH.adjust = 0.01;
	        /* minimum, for leading low loudness */
	        gfc.ATH.adjustLimit = 1.0;
	        /* on lead, allow adjust up to maximum */


	        if (gfp.ATHtype != -1) {
	            /* compute equal loudness weights (eql_w) */
	            var freq;
	            var freq_inc = gfp.out_samplerate
	                / (Encoder.BLKSIZE);
	            var eql_balance = 0.0;
	            freq = 0.0;
	            for (i = 0; i < Encoder.BLKSIZE / 2; ++i) {
	                /* convert ATH dB to relative power (not dB) */
	                /* to determine eql_w */
	                freq += freq_inc;
	                gfc.ATH.eql_w[i] = 1. / Math.pow(10, this.ATHformula(freq, gfp) / 10);
	                eql_balance += gfc.ATH.eql_w[i];
	            }
	            eql_balance = 1.0 / eql_balance;
	            for (i = Encoder.BLKSIZE / 2; --i >= 0;) { /* scale weights */
	                gfc.ATH.eql_w[i] *= eql_balance;
	            }
	        }
	        {
	            for (var b = j = 0; b < gfc.npart_s; ++b) {
	                for (i = 0; i < gfc.numlines_s[b]; ++i) {
	                    ++j;
	                }
	            }
	            for (var b = j = 0; b < gfc.npart_l; ++b) {
	                for (i = 0; i < gfc.numlines_l[b]; ++i) {
	                    ++j;
	                }
	            }
	        }
	        j = 0;
	        for (i = 0; i < gfc.npart_l; i++) {
	            var freq = sfreq * (j + gfc.numlines_l[i] / 2) / (1.0 * Encoder.BLKSIZE);
	            gfc.mld_cb_l[i] = stereo_demask(freq);
	            j += gfc.numlines_l[i];
	        }
	        for (; i < Encoder.CBANDS; ++i) {
	            gfc.mld_cb_l[i] = 1;
	        }
	        j = 0;
	        for (i = 0; i < gfc.npart_s; i++) {
	            var freq = sfreq * (j + gfc.numlines_s[i] / 2) / (1.0 * Encoder.BLKSIZE_s);
	            gfc.mld_cb_s[i] = stereo_demask(freq);
	            j += gfc.numlines_s[i];
	        }
	        for (; i < Encoder.CBANDS; ++i) {
	            gfc.mld_cb_s[i] = 1;
	        }
	        return 0;
	    }
	    this.setModules = function (_ga, _bs, _p, _qupvt, _qu, _vbr, _ver, _id3, _mpglib) {
	    function optimum_samplefreq(lowpassfreq, input_samplefreq) {
	        /*
	         * Rules:
	         *
	         * - if possible, sfb21 should NOT be used
	         */
	        var suggested_samplefreq = 44100;

	        if (input_samplefreq >= 48000)
	            suggested_samplefreq = 48000;
	        else if (input_samplefreq >= 44100)
	            suggested_samplefreq = 44100;
	        else if (input_samplefreq >= 32000)
	            suggested_samplefreq = 32000;
	        else if (input_samplefreq >= 24000)
	            suggested_samplefreq = 24000;
	        else if (input_samplefreq >= 22050)
	            suggested_samplefreq = 22050;
	        else if (input_samplefreq >= 16000)
	            suggested_samplefreq = 16000;
	        else if (input_samplefreq >= 12000)
	            suggested_samplefreq = 12000;
	        else if (input_samplefreq >= 11025)
	            suggested_samplefreq = 11025;
	        else if (input_samplefreq >= 8000)
	            suggested_samplefreq = 8000;

	        if (lowpassfreq == -1)
	            return suggested_samplefreq;

	        if (lowpassfreq <= 15960)
	            suggested_samplefreq = 44100;
	        if (lowpassfreq <= 15250)
	            suggested_samplefreq = 32000;
	        if (lowpassfreq <= 11220)
	            suggested_samplefreq = 24000;
	        if (lowpassfreq <= 9970)
	            suggested_samplefreq = 22050;
	        if (lowpassfreq <= 7230)
	            suggested_samplefreq = 16000;
	        if (lowpassfreq <= 5420)
	            suggested_samplefreq = 12000;
	        if (lowpassfreq <= 4510)
	            suggested_samplefreq = 11025;
	        if (lowpassfreq <= 3970)
	            suggested_samplefreq = 8000;

	        if (input_samplefreq < suggested_samplefreq) {
	            /*
	             * choose a valid MPEG sample frequency above the input sample
	             * frequency to avoid SFB21/12 bitrate bloat rh 061115
	             */
	            if (input_samplefreq > 44100) {
	                return 48000;
	            }
	            if (input_samplefreq > 32000) {
	                return 44100;
	            }
	            if (input_samplefreq > 24000) {
	                return 32000;
	            }
	            if (input_samplefreq > 22050) {
	                return 24000;
	            }
	            if (input_samplefreq > 16000) {
	                return 22050;
	            }
	            if (input_samplefreq > 12000) {
	                return 16000;
	            }
	            if (input_samplefreq > 11025) {
	                return 12000;
	            }
	            if (input_samplefreq > 8000) {
	                return 11025;
	            }
	            return 8000;
	        }
	        return suggested_samplefreq;
	    }
	    function lame_init_qval(gfp) {
	        var gfc = gfp.internal_flags;

	        switch (gfp.quality) {
	            default:
	            case 9: /* no psymodel, no noise shaping */
	                gfc.psymodel = 0;
	                gfc.noise_shaping = 0;
	                gfc.noise_shaping_amp = 0;
	                gfc.noise_shaping_stop = 0;
	                gfc.use_best_huffman = 0;
	                gfc.full_outer_loop = 0;
	                break;

	            case 8:
	                gfp.quality = 7;
	            //$FALL-THROUGH$
	            case 7:
	                /*
	                 * use psymodel (for short block and m/s switching), but no noise
	                 * shapping
	                 */
	                gfc.psymodel = 1;
	                gfc.noise_shaping = 0;
	                gfc.noise_shaping_amp = 0;
	                gfc.noise_shaping_stop = 0;
	                gfc.use_best_huffman = 0;
	                gfc.full_outer_loop = 0;
	                break;

	            case 6:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                gfc.noise_shaping_amp = 0;
	                gfc.noise_shaping_stop = 0;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 0;
	                gfc.full_outer_loop = 0;
	                break;

	            case 5:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                gfc.noise_shaping_amp = 0;
	                gfc.noise_shaping_stop = 0;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 0;
	                gfc.full_outer_loop = 0;
	                break;

	            case 4:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                gfc.noise_shaping_amp = 0;
	                gfc.noise_shaping_stop = 0;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 1;
	                gfc.full_outer_loop = 0;
	                break;

	            case 3:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                gfc.noise_shaping_amp = 1;
	                gfc.noise_shaping_stop = 1;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 1;
	                gfc.full_outer_loop = 0;
	                break;

	            case 2:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                if (gfc.substep_shaping == 0)
	                    gfc.substep_shaping = 2;
	                gfc.noise_shaping_amp = 1;
	                gfc.noise_shaping_stop = 1;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 1;
	                /* inner loop */
	                gfc.full_outer_loop = 0;
	                break;

	            case 1:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                if (gfc.substep_shaping == 0)
	                    gfc.substep_shaping = 2;
	                gfc.noise_shaping_amp = 2;
	                gfc.noise_shaping_stop = 1;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 1;
	                gfc.full_outer_loop = 0;
	                break;

	            case 0:
	                gfc.psymodel = 1;
	                if (gfc.noise_shaping == 0)
	                    gfc.noise_shaping = 1;
	                if (gfc.substep_shaping == 0)
	                    gfc.substep_shaping = 2;
	                gfc.noise_shaping_amp = 2;
	                gfc.noise_shaping_stop = 1;
	                if (gfc.subblock_gain == -1)
	                    gfc.subblock_gain = 1;
	                gfc.use_best_huffman = 1;
	                /*
	                 * type 2 disabled because of it slowness, in favor of full outer
	                 * loop search
	                 */
	                gfc.full_outer_loop = 0;
	                /*
	                 * full outer loop search disabled because of audible distortions it
	                 * may generate rh 060629
	                 */
	                break;
	        }

	    }
	    this.lame_init_params = function (gfp) {
	        var gfc = gfp.internal_flags;

	        gfc.Class_ID = 0;
	        if (gfc.ATH == null)
	            gfc.ATH = new ATH();
	        if (gfc.PSY == null)
	            gfc.PSY = new PSY();
	        if (gfc.rgdata == null)
	            gfc.rgdata = new ReplayGain();

	        gfc.channels_in = gfp.num_channels;
	        if (gfc.channels_in == 1)
	            gfp.mode = MPEGMode.MONO;
	        gfc.channels_out = (gfp.mode == MPEGMode.MONO) ? 1 : 2;
	        gfc.mode_ext = Encoder.MPG_MD_MS_LR;
	        if (gfp.mode == MPEGMode.MONO)
	            gfp.force_ms = false;
	        /*
	         * don't allow forced mid/side stereo for mono output
	         */

	        if (gfp.VBR == VbrMode.vbr_off && gfp.VBR_mean_bitrate_kbps != 128
	            && gfp.brate == 0)
	            gfp.brate = gfp.VBR_mean_bitrate_kbps;

	        if (gfp.VBR == VbrMode.vbr_off || gfp.VBR == VbrMode.vbr_mtrh
	            || gfp.VBR == VbrMode.vbr_mt) {
	            /* these modes can handle free format condition */
	        } else {
	            gfp.free_format = false;
	            /* mode can't be mixed with free format */
	        }

	        if (gfp.VBR == VbrMode.vbr_off && gfp.brate == 0) {
	            /* no bitrate or compression ratio specified, use 11.025 */
	            if (BitStream.EQ(gfp.compression_ratio, 0))
	                gfp.compression_ratio = 11.025;
	            /*
	             * rate to compress a CD down to exactly 128000 bps
	             */
	        }

	        /* find bitrate if user specify a compression ratio */
	        if (gfp.VBR == VbrMode.vbr_off && gfp.compression_ratio > 0) {

	            if (gfp.out_samplerate == 0)
	                gfp.out_samplerate = map2MP3Frequency((int)(0.97 * gfp.in_samplerate));
	            /*
	             * round up with a margin of 3 %
	             */

	            /*
	             * choose a bitrate for the output samplerate which achieves
	             * specified compression ratio
	             */
	            gfp.brate = 0 | (gfp.out_samplerate * 16 * gfc.channels_out / (1.e3 * gfp.compression_ratio));

	            /* we need the version for the bitrate table look up */
	            gfc.samplerate_index = SmpFrqIndex(gfp.out_samplerate, gfp);

	            if (!gfp.free_format) /*
	             * for non Free Format find the nearest allowed
	             * bitrate
	             */
	                gfp.brate = FindNearestBitrate(gfp.brate, gfp.version,
	                    gfp.out_samplerate);
	        }

	        if (gfp.out_samplerate != 0) {
	            if (gfp.out_samplerate < 16000) {
	                gfp.VBR_mean_bitrate_kbps = Math.max(gfp.VBR_mean_bitrate_kbps,
	                    8);
	                gfp.VBR_mean_bitrate_kbps = Math.min(gfp.VBR_mean_bitrate_kbps,
	                    64);
	            } else if (gfp.out_samplerate < 32000) {
	                gfp.VBR_mean_bitrate_kbps = Math.max(gfp.VBR_mean_bitrate_kbps,
	                    8);
	                gfp.VBR_mean_bitrate_kbps = Math.min(gfp.VBR_mean_bitrate_kbps,
	                    160);
	            } else {
	                gfp.VBR_mean_bitrate_kbps = Math.max(gfp.VBR_mean_bitrate_kbps,
	                    32);
	                gfp.VBR_mean_bitrate_kbps = Math.min(gfp.VBR_mean_bitrate_kbps,
	                    320);
	            }
	        }

	        /****************************************************************/
	        /* if a filter has not been enabled, see if we should add one: */
	        /****************************************************************/
	        if (gfp.lowpassfreq == 0) {
	            var lowpass = 16000.;

	            switch (gfp.VBR) {
	                case VbrMode.vbr_off:
	                {
	                    var lh = new LowPassHighPass();
	                    optimum_bandwidth(lh, gfp.brate);
	                    lowpass = lh.lowerlimit;
	                    break;
	                }
	                case VbrMode.vbr_abr:
	                {
	                    var lh = new LowPassHighPass();
	                    optimum_bandwidth(lh, gfp.VBR_mean_bitrate_kbps);
	                    lowpass = lh.lowerlimit;
	                    break;
	                }
	                case VbrMode.vbr_rh:
	                {
	                    var x = [19500, 19000, 18600, 18000, 17500, 16000,
	                        15600, 14900, 12500, 10000, 3950];
	                    if (0 <= gfp.VBR_q && gfp.VBR_q <= 9) {
	                        var a = x[gfp.VBR_q], b = x[gfp.VBR_q + 1], m = gfp.VBR_q_frac;
	                        lowpass = linear_int(a, b, m);
	                    } else {
	                        lowpass = 19500;
	                    }
	                    break;
	                }
	                default:
	                {
	                    var x = [19500, 19000, 18500, 18000, 17500, 16500,
	                        15500, 14500, 12500, 9500, 3950];
	                    if (0 <= gfp.VBR_q && gfp.VBR_q <= 9) {
	                        var a = x[gfp.VBR_q], b = x[gfp.VBR_q + 1], m = gfp.VBR_q_frac;
	                        lowpass = linear_int(a, b, m);
	                    } else {
	                        lowpass = 19500;
	                    }
	                }
	            }
	            if (gfp.mode == MPEGMode.MONO
	                && (gfp.VBR == VbrMode.vbr_off || gfp.VBR == VbrMode.vbr_abr))
	                lowpass *= 1.5;

	            gfp.lowpassfreq = lowpass | 0;
	        }

	        if (gfp.out_samplerate == 0) {
	            if (2 * gfp.lowpassfreq > gfp.in_samplerate) {
	                gfp.lowpassfreq = gfp.in_samplerate / 2;
	            }
	            gfp.out_samplerate = optimum_samplefreq(gfp.lowpassfreq | 0,
	                gfp.in_samplerate);
	        }

	        gfp.lowpassfreq = Math.min(20500, gfp.lowpassfreq);
	        gfp.lowpassfreq = Math.min(gfp.out_samplerate / 2, gfp.lowpassfreq);

	        if (gfp.VBR == VbrMode.vbr_off) {
	            gfp.compression_ratio = gfp.out_samplerate * 16 * gfc.channels_out
	                / (1.e3 * gfp.brate);
	        }
	        if (gfp.VBR == VbrMode.vbr_abr) {
	            gfp.compression_ratio = gfp.out_samplerate * 16 * gfc.channels_out
	                / (1.e3 * gfp.VBR_mean_bitrate_kbps);
	        }

	        /*
	         * do not compute ReplayGain values and do not find the peak sample if
	         * we can't store them
	         */
	        if (!gfp.bWriteVbrTag) {
	            gfp.findReplayGain = false;
	            gfp.decode_on_the_fly = false;
	            gfc.findPeakSample = false;
	        }
	        gfc.findReplayGain = gfp.findReplayGain;
	        gfc.decode_on_the_fly = gfp.decode_on_the_fly;

	        if (gfc.decode_on_the_fly)
	            gfc.findPeakSample = true;

	        if (gfc.findReplayGain) {
	            if (ga.InitGainAnalysis(gfc.rgdata, gfp.out_samplerate) == GainAnalysis.INIT_GAIN_ANALYSIS_ERROR) {
	                gfp.internal_flags = null;
	                return -6;
	            }
	        }

	        if (gfc.decode_on_the_fly && !gfp.decode_only) {
	            if (gfc.hip != null) {
	                mpglib.hip_decode_exit(gfc.hip);
	            }
	            gfc.hip = mpglib.hip_decode_init();
	        }

	        gfc.mode_gr = gfp.out_samplerate <= 24000 ? 1 : 2;
	        /*
	         * Number of granules per frame
	         */
	        gfp.framesize = 576 * gfc.mode_gr;
	        gfp.encoder_delay = Encoder.ENCDELAY;

	        gfc.resample_ratio = gfp.in_samplerate / gfp.out_samplerate;

	        /**
	         * <PRE>
	         *  sample freq       bitrate     compression ratio
	         *     [kHz]      [kbps/channel]   for 16 bit input
	         *     44.1            56               12.6
	         *     44.1            64               11.025
	         *     44.1            80                8.82
	         *     22.05           24               14.7
	         *     22.05           32               11.025
	         *     22.05           40                8.82
	         *     16              16               16.0
	         *     16              24               10.667
	         * </PRE>
	         */
	        /**
	         * <PRE>
	         *  For VBR, take a guess at the compression_ratio.
	         *  For example:
	         *
	         *    VBR_q    compression     like
	         *     -        4.4         320 kbps/44 kHz
	         *   0...1      5.5         256 kbps/44 kHz
	         *     2        7.3         192 kbps/44 kHz
	         *     4        8.8         160 kbps/44 kHz
	         *     6       11           128 kbps/44 kHz
	         *     9       14.7          96 kbps
	         *
	         *  for lower bitrates, downsample with --resample
	         * </PRE>
	         */
	        switch (gfp.VBR) {
	            case VbrMode.vbr_mt:
	            case VbrMode.vbr_rh:
	            case VbrMode.vbr_mtrh:
	            {
	                /* numbers are a bit strange, but they determine the lowpass value */
	                var cmp = [5.7, 6.5, 7.3, 8.2, 10, 11.9, 13, 14,
	                    15, 16.5];
	                gfp.compression_ratio = cmp[gfp.VBR_q];
	            }
	                break;
	            case VbrMode.vbr_abr:
	                gfp.compression_ratio = gfp.out_samplerate * 16 * gfc.channels_out
	                    / (1.e3 * gfp.VBR_mean_bitrate_kbps);
	                break;
	            default:
	                gfp.compression_ratio = gfp.out_samplerate * 16 * gfc.channels_out
	                    / (1.e3 * gfp.brate);
	                break;
	        }

	        /*
	         * mode = -1 (not set by user) or mode = MONO (because of only 1 input
	         * channel). If mode has not been set, then select J-STEREO
	         */
	        if (gfp.mode == MPEGMode.NOT_SET) {
	            gfp.mode = MPEGMode.JOINT_STEREO;
	        }

	        /* apply user driven high pass filter */
	        if (gfp.highpassfreq > 0) {
	            gfc.highpass1 = 2. * gfp.highpassfreq;

	            if (gfp.highpasswidth >= 0)
	                gfc.highpass2 = 2. * (gfp.highpassfreq + gfp.highpasswidth);
	            else
	            /* 0% above on default */
	                gfc.highpass2 = (1 + 0.00) * 2. * gfp.highpassfreq;

	            gfc.highpass1 /= gfp.out_samplerate;
	            gfc.highpass2 /= gfp.out_samplerate;
	        } else {
	            gfc.highpass1 = 0;
	            gfc.highpass2 = 0;
	        }
	        /* apply user driven low pass filter */
	        if (gfp.lowpassfreq > 0) {
	            gfc.lowpass2 = 2. * gfp.lowpassfreq;
	            if (gfp.lowpasswidth >= 0) {
	                gfc.lowpass1 = 2. * (gfp.lowpassfreq - gfp.lowpasswidth);
	                if (gfc.lowpass1 < 0) /* has to be >= 0 */
	                    gfc.lowpass1 = 0;
	            } else { /* 0% below on default */
	                gfc.lowpass1 = (1 - 0.00) * 2. * gfp.lowpassfreq;
	            }
	            gfc.lowpass1 /= gfp.out_samplerate;
	            gfc.lowpass2 /= gfp.out_samplerate;
	        } else {
	            gfc.lowpass1 = 0;
	            gfc.lowpass2 = 0;
	        }

	        /**********************************************************************/
	        /* compute info needed for polyphase filter (filter type==0, default) */
	        /**********************************************************************/
	        lame_init_params_ppflt(gfp);
	        /*******************************************************
	         * samplerate and bitrate index
	         *******************************************************/
	        gfc.samplerate_index = SmpFrqIndex(gfp.out_samplerate, gfp);
	        if (gfc.samplerate_index < 0) {
	            gfp.internal_flags = null;
	            return -1;
	        }

	        if (gfp.VBR == VbrMode.vbr_off) {
	            if (gfp.free_format) {
	                gfc.bitrate_index = 0;
	            } else {
	                gfp.brate = FindNearestBitrate(gfp.brate, gfp.version,
	                    gfp.out_samplerate);
	                gfc.bitrate_index = BitrateIndex(gfp.brate, gfp.version,
	                    gfp.out_samplerate);
	                if (gfc.bitrate_index <= 0) {
	                    gfp.internal_flags = null;
	                    return -1;
	                }
	            }
	        } else {
	            gfc.bitrate_index = 1;
	        }

	        /* for CBR, we will write an "info" tag. */

	        if (gfp.analysis)
	            gfp.bWriteVbrTag = false;

	        /* some file options not allowed if output is: not specified or stdout */
	        if (gfc.pinfo != null)
	            gfp.bWriteVbrTag = false;
	        /* disable Xing VBR tag */

	        bs.init_bit_stream_w(gfc);

	        var j = gfc.samplerate_index + (3 * gfp.version) + 6
	            * (gfp.out_samplerate < 16000 ? 1 : 0);
	        for (var i = 0; i < Encoder.SBMAX_l + 1; i++)
	            gfc.scalefac_band.l[i] = qupvt.sfBandIndex[j].l[i];

	        for (var i = 0; i < Encoder.PSFB21 + 1; i++) {
	            var size = (gfc.scalefac_band.l[22] - gfc.scalefac_band.l[21])
	                / Encoder.PSFB21;
	            var start = gfc.scalefac_band.l[21] + i * size;
	            gfc.scalefac_band.psfb21[i] = start;
	        }
	        gfc.scalefac_band.psfb21[Encoder.PSFB21] = 576;

	        for (var i = 0; i < Encoder.SBMAX_s + 1; i++)
	            gfc.scalefac_band.s[i] = qupvt.sfBandIndex[j].s[i];

	        for (var i = 0; i < Encoder.PSFB12 + 1; i++) {
	            var size = (gfc.scalefac_band.s[13] - gfc.scalefac_band.s[12])
	                / Encoder.PSFB12;
	            var start = gfc.scalefac_band.s[12] + i * size;
	            gfc.scalefac_band.psfb12[i] = start;
	        }
	        gfc.scalefac_band.psfb12[Encoder.PSFB12] = 192;
	        /* determine the mean bitrate for main data */
	        if (gfp.version == 1) /* MPEG 1 */
	            gfc.sideinfo_len = (gfc.channels_out == 1) ? 4 + 17 : 4 + 32;
	        else
	        /* MPEG 2 */
	            gfc.sideinfo_len = (gfc.channels_out == 1) ? 4 + 9 : 4 + 17;

	        if (gfp.error_protection)
	            gfc.sideinfo_len += 2;

	        lame_init_bitstream(gfp);

	        gfc.Class_ID = LAME_ID;

	        {
	            var k;

	            for (k = 0; k < 19; k++)
	                gfc.nsPsy.pefirbuf[k] = 700 * gfc.mode_gr * gfc.channels_out;

	            if (gfp.ATHtype == -1)
	                gfp.ATHtype = 4;
	        }

	        switch (gfp.VBR) {

	            case VbrMode.vbr_mt:
	                gfp.VBR = VbrMode.vbr_mtrh;
	            //$FALL-THROUGH$
	            case VbrMode.vbr_mtrh:
	            {
	                if (gfp.useTemporal == null) {
	                    gfp.useTemporal = false;
	                    /* off by default for this VBR mode */
	                }

	                p.apply_preset(gfp, 500 - (gfp.VBR_q * 10), 0);
	                /**
	                 * <PRE>
	                 *   The newer VBR code supports only a limited
	                 *     subset of quality levels:
	                 *     9-5=5 are the same, uses x^3/4 quantization
	                 *   4-0=0 are the same  5 plus best huffman divide code
	                 * </PRE>
	                 */
	                if (gfp.quality < 0)
	                    gfp.quality = LAME_DEFAULT_QUALITY;
	                if (gfp.quality < 5)
	                    gfp.quality = 0;
	                if (gfp.quality > 5)
	                    gfp.quality = 5;

	                gfc.PSY.mask_adjust = gfp.maskingadjust;
	                gfc.PSY.mask_adjust_short = gfp.maskingadjust_short;

	                /*
	                 * sfb21 extra only with MPEG-1 at higher sampling rates
	                 */
	                if (gfp.experimentalY)
	                    gfc.sfb21_extra = false;
	                else
	                    gfc.sfb21_extra = (gfp.out_samplerate > 44000);

	                gfc.iteration_loop = new VBRNewIterationLoop(qu);
	                break;

	            }
	            case VbrMode.vbr_rh:
	            {

	                p.apply_preset(gfp, 500 - (gfp.VBR_q * 10), 0);

	                gfc.PSY.mask_adjust = gfp.maskingadjust;
	                gfc.PSY.mask_adjust_short = gfp.maskingadjust_short;

	                /*
	                 * sfb21 extra only with MPEG-1 at higher sampling rates
	                 */
	                if (gfp.experimentalY)
	                    gfc.sfb21_extra = false;
	                else
	                    gfc.sfb21_extra = (gfp.out_samplerate > 44000);

	                /*
	                 * VBR needs at least the output of GPSYCHO, so we have to garantee
	                 * that by setting a minimum quality level, actually level 6 does
	                 * it. down to level 6
	                 */
	                if (gfp.quality > 6)
	                    gfp.quality = 6;

	                if (gfp.quality < 0)
	                    gfp.quality = LAME_DEFAULT_QUALITY;

	                gfc.iteration_loop = new VBROldIterationLoop(qu);
	                break;
	            }

	            default: /* cbr/abr */
	            {
	                var vbrmode;

	                /*
	                 * no sfb21 extra with CBR code
	                 */
	                gfc.sfb21_extra = false;

	                if (gfp.quality < 0)
	                    gfp.quality = LAME_DEFAULT_QUALITY;

	                vbrmode = gfp.VBR;
	                if (vbrmode == VbrMode.vbr_off)
	                    gfp.VBR_mean_bitrate_kbps = gfp.brate;
	                /* second, set parameters depending on bitrate */
	                p.apply_preset(gfp, gfp.VBR_mean_bitrate_kbps, 0);
	                gfp.VBR = vbrmode;

	                gfc.PSY.mask_adjust = gfp.maskingadjust;
	                gfc.PSY.mask_adjust_short = gfp.maskingadjust_short;

	                if (vbrmode == VbrMode.vbr_off) {
	                    gfc.iteration_loop = new CBRNewIterationLoop(qu);
	                } else {
	                    gfc.iteration_loop = new ABRIterationLoop(qu);
	                }
	                break;
	            }
	        }
	        /* initialize default values common for all modes */

	        if (gfp.VBR != VbrMode.vbr_off) { /* choose a min/max bitrate for VBR */
	            /* if the user didn't specify VBR_max_bitrate: */
	            gfc.VBR_min_bitrate = 1;
	            /*
	             * default: allow 8 kbps (MPEG-2) or 32 kbps (MPEG-1)
	             */
	            gfc.VBR_max_bitrate = 14;
	            /*
	             * default: allow 160 kbps (MPEG-2) or 320 kbps (MPEG-1)
	             */
	            if (gfp.out_samplerate < 16000)
	                gfc.VBR_max_bitrate = 8;
	            /* default: allow 64 kbps (MPEG-2.5) */
	            if (gfp.VBR_min_bitrate_kbps != 0) {
	                gfp.VBR_min_bitrate_kbps = FindNearestBitrate(
	                    gfp.VBR_min_bitrate_kbps, gfp.version,
	                    gfp.out_samplerate);
	                gfc.VBR_min_bitrate = BitrateIndex(gfp.VBR_min_bitrate_kbps,
	                    gfp.version, gfp.out_samplerate);
	                if (gfc.VBR_min_bitrate < 0)
	                    return -1;
	            }
	            if (gfp.VBR_max_bitrate_kbps != 0) {
	                gfp.VBR_max_bitrate_kbps = FindNearestBitrate(
	                    gfp.VBR_max_bitrate_kbps, gfp.version,
	                    gfp.out_samplerate);
	                gfc.VBR_max_bitrate = BitrateIndex(gfp.VBR_max_bitrate_kbps,
	                    gfp.version, gfp.out_samplerate);
	                if (gfc.VBR_max_bitrate < 0)
	                    return -1;
	            }
	            gfp.VBR_min_bitrate_kbps = Tables.bitrate_table[gfp.version][gfc.VBR_min_bitrate];
	            gfp.VBR_max_bitrate_kbps = Tables.bitrate_table[gfp.version][gfc.VBR_max_bitrate];
	            gfp.VBR_mean_bitrate_kbps = Math.min(
	                Tables.bitrate_table[gfp.version][gfc.VBR_max_bitrate],
	                gfp.VBR_mean_bitrate_kbps);
	            gfp.VBR_mean_bitrate_kbps = Math.max(
	                Tables.bitrate_table[gfp.version][gfc.VBR_min_bitrate],
	                gfp.VBR_mean_bitrate_kbps);
	        }

	        /* just another daily changing developer switch */
	        if (gfp.tune) {
	            gfc.PSY.mask_adjust += gfp.tune_value_a;
	            gfc.PSY.mask_adjust_short += gfp.tune_value_a;
	        }

	        /* initialize internal qval settings */
	        lame_init_qval(gfp);
	        /*
	         * automatic ATH adjustment on
	         */
	        if (gfp.athaa_type < 0)
	            gfc.ATH.useAdjust = 3;
	        else
	            gfc.ATH.useAdjust = gfp.athaa_type;

	        /* initialize internal adaptive ATH settings -jd */
	        gfc.ATH.aaSensitivityP = Math.pow(10.0, gfp.athaa_sensitivity
	            / -10.0);

	        if (gfp.short_blocks == null) {
	            gfp.short_blocks = ShortBlock.short_block_allowed;
	        }

	        /*
	         * Note Jan/2003: Many hardware decoders cannot handle short blocks in
	         * regular stereo mode unless they are coupled (same type in both
	         * channels) it is a rare event (1 frame per min. or so) that LAME would
	         * use uncoupled short blocks, so lets turn them off until we decide how
	         * to handle this. No other encoders allow uncoupled short blocks, even
	         * though it is in the standard.
	         */
	        /*
	         * rh 20040217: coupling makes no sense for mono and dual-mono streams
	         */
	        if (gfp.short_blocks == ShortBlock.short_block_allowed
	            && (gfp.mode == MPEGMode.JOINT_STEREO || gfp.mode == MPEGMode.STEREO)) {
	            gfp.short_blocks = ShortBlock.short_block_coupled;
	        }

	        if (gfp.quant_comp < 0)
	            gfp.quant_comp = 1;
	        if (gfp.quant_comp_short < 0)
	            gfp.quant_comp_short = 0;

	        if (gfp.msfix < 0)
	            gfp.msfix = 0;

	        /* select psychoacoustic model */
	        gfp.exp_nspsytune = gfp.exp_nspsytune | 1;

	        if (gfp.internal_flags.nsPsy.attackthre < 0)
	            gfp.internal_flags.nsPsy.attackthre = PsyModel.NSATTACKTHRE;
	        if (gfp.internal_flags.nsPsy.attackthre_s < 0)
	            gfp.internal_flags.nsPsy.attackthre_s = PsyModel.NSATTACKTHRE_S;


	        if (gfp.scale < 0)
	            gfp.scale = 1;

	        if (gfp.ATHtype < 0)
	            gfp.ATHtype = 4;

	        if (gfp.ATHcurve < 0)
	            gfp.ATHcurve = 4;

	        if (gfp.athaa_loudapprox < 0)
	            gfp.athaa_loudapprox = 2;

	        if (gfp.interChRatio < 0)
	            gfp.interChRatio = 0;

	        if (gfp.useTemporal == null)
	            gfp.useTemporal = true;
	        /* on by default */

	        /*
	         * padding method as described in
	         * "MPEG-Layer3 / Bitstream Syntax and Decoding" by Martin Sieler, Ralph
	         * Sperschneider
	         *
	         * note: there is no padding for the very first frame
	         *
	         * Robert Hegemann 2000-06-22
	         */
	        gfc.slot_lag = gfc.frac_SpF = 0;
	        if (gfp.VBR == VbrMode.vbr_off)
	            gfc.slot_lag = gfc.frac_SpF = (((gfp.version + 1) * 72000 * gfp.brate) % gfp.out_samplerate) | 0;

	        qupvt.iteration_init(gfp);
	        psy.psymodel_init(gfp);
	        return 0;
	    }
	    this.lame_encode_buffer = function (gfp, buffer_l, buffer_r, nsamples, mp3buf, mp3bufPos, mp3buf_size) {
	    function lame_encode_buffer_sample(gfp, buffer_l, buffer_r, nsamples, mp3buf, mp3bufPos, mp3buf_size) {
	        var gfc = gfp.internal_flags;
	        var mp3size = 0, ret, i, ch, mf_needed;
	        var mp3out;
	        var mfbuf = [null, null];
	        var in_buffer = [null, null];

	        if (gfc.Class_ID != LAME_ID)
	            return -3;

	        if (nsamples == 0)
	            return 0;

	        /* copy out any tags that may have been written into bitstream */
	        mp3out = bs.copy_buffer(gfc, mp3buf, mp3bufPos, mp3buf_size, 0);
	        if (mp3out < 0)
	            return mp3out;
	        /* not enough buffer space */
	        mp3bufPos += mp3out;
	        mp3size += mp3out;

	        in_buffer[0] = buffer_l;
	        in_buffer[1] = buffer_r;

	        /* Apply user defined re-scaling */

	        /* user selected scaling of the samples */
	        if (BitStream.NEQ(gfp.scale, 0) && BitStream.NEQ(gfp.scale, 1.0)) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[0][i] *= gfp.scale;
	                if (gfc.channels_out == 2)
	                    in_buffer[1][i] *= gfp.scale;
	            }
	        }

	        /* user selected scaling of the channel 0 (left) samples */
	        if (BitStream.NEQ(gfp.scale_left, 0)
	            && BitStream.NEQ(gfp.scale_left, 1.0)) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[0][i] *= gfp.scale_left;
	            }
	        }

	        /* user selected scaling of the channel 1 (right) samples */
	        if (BitStream.NEQ(gfp.scale_right, 0)
	            && BitStream.NEQ(gfp.scale_right, 1.0)) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[1][i] *= gfp.scale_right;
	            }
	        }

	        /* Downsample to Mono if 2 channels in and 1 channel out */
	        if (gfp.num_channels == 2 && gfc.channels_out == 1) {
	            for (i = 0; i < nsamples; ++i) {
	                in_buffer[0][i] = 0.5 * ( in_buffer[0][i] + in_buffer[1][i]);
	                in_buffer[1][i] = 0.0;
	            }
	        }

	        mf_needed = calcNeeded(gfp);

	        mfbuf[0] = gfc.mfbuf[0];
	        mfbuf[1] = gfc.mfbuf[1];

	        var in_bufferPos = 0;
	        while (nsamples > 0) {
	            var in_buffer_ptr = [null, null];
	            var n_in = 0;
	            /* number of input samples processed with fill_buffer */
	            var n_out = 0;
	            /* number of samples output with fill_buffer */
	            /* n_in <> n_out if we are resampling */

	            in_buffer_ptr[0] = in_buffer[0];
	            in_buffer_ptr[1] = in_buffer[1];
	            /* copy in new samples into mfbuf, with resampling */
	            var inOut = new InOut();
	            fill_buffer(gfp, mfbuf, in_buffer_ptr, in_bufferPos, nsamples,
	                inOut);
	            n_in = inOut.n_in;
	            n_out = inOut.n_out;

	            /* compute ReplayGain of resampled input if requested */
	            if (gfc.findReplayGain && !gfc.decode_on_the_fly)
	                if (ga.AnalyzeSamples(gfc.rgdata, mfbuf[0], gfc.mf_size,
	                        mfbuf[1], gfc.mf_size, n_out, gfc.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR)
	                    return -6;

	            /* update in_buffer counters */
	            nsamples -= n_in;
	            in_bufferPos += n_in;
	            if (gfc.channels_out == 2)
	                ;// in_bufferPos += n_in;

	            /* update mfbuf[] counters */
	            gfc.mf_size += n_out;

	            /*
	             * lame_encode_flush may have set gfc.mf_sample_to_encode to 0 so we
	             * have to reinitialize it here when that happened.
	             */
	            if (gfc.mf_samples_to_encode < 1) {
	                gfc.mf_samples_to_encode = Encoder.ENCDELAY + Encoder.POSTDELAY;
	            }
	            gfc.mf_samples_to_encode += n_out;

	            if (gfc.mf_size >= mf_needed) {
	                /* encode the frame. */
	                /* mp3buf = pointer to current location in buffer */
	                /* mp3buf_size = size of original mp3 output buffer */
	                /* = 0 if we should not worry about the */
	                /* buffer size because calling program is */
	                /* to lazy to compute it */
	                /* mp3size = size of data written to buffer so far */
	                /* mp3buf_size-mp3size = amount of space avalable */

	                var buf_size = mp3buf_size - mp3size;
	                if (mp3buf_size == 0)
	                    buf_size = 0;

	                ret = lame_encode_frame(gfp, mfbuf[0], mfbuf[1], mp3buf,
	                    mp3bufPos, buf_size);

	                if (ret < 0)
	                    return ret;
	                mp3bufPos += ret;
	                mp3size += ret;

	                /* shift out old samples */
	                gfc.mf_size -= gfp.framesize;
	                gfc.mf_samples_to_encode -= gfp.framesize;
	                for (ch = 0; ch < gfc.channels_out; ch++)
	                    for (i = 0; i < gfc.mf_size; i++)
	                        mfbuf[ch][i] = mfbuf[ch][i + gfp.framesize];
	            }
	        }

	        return mp3size;
	    }
	    function lame_encode_frame(gfp, inbuf_l, inbuf_r, mp3buf, mp3bufPos, mp3buf_size) {
	    function fill_buffer_resample(gfp, outbuf, outbufPos, desired_len, inbuf, in_bufferPos, len, num_used, ch) {
	    function fill_buffer(gfp, mfbuf, in_buffer, in_bufferPos, nsamples, io) {