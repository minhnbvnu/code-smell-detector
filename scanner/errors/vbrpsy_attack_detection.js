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