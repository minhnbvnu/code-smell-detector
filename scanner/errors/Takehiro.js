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