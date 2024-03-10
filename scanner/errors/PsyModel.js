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