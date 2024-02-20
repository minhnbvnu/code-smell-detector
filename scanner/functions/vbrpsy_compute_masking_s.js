function vbrpsy_compute_masking_s(gfp, fftenergy_s, eb, thr, chn, sblock) {
	        var gfc = gfp.internal_flags;
	        var max = new float[Encoder.CBANDS], avg = new_float(Encoder.CBANDS);
	        var i, j, b;
	        var mask_idx_s = new int[Encoder.CBANDS];

	        for (b = j = 0; b < gfc.npart_s; ++b) {
	            var ebb = 0, m = 0;
	            var n = gfc.numlines_s[b];
	            for (i = 0; i < n; ++i, ++j) {
	                var el = fftenergy_s[sblock][j];
	                ebb += el;
	                if (m < el)
	                    m = el;
	            }
	            eb[b] = ebb;
	            max[b] = m;
	            avg[b] = ebb / n;
	        }
	        for (; b < Encoder.CBANDS; ++b) {
	            max[b] = 0;
	            avg[b] = 0;
	        }
	        psyvbr_calc_mask_index_s(gfc, max, avg, mask_idx_s);
	        for (j = b = 0; b < gfc.npart_s; b++) {
	            var kk = gfc.s3ind_s[b][0];
	            var last = gfc.s3ind_s[b][1];
	            var dd, dd_n;
	            var x, ecb, avg_mask;
	            dd = mask_idx_s[kk];
	            dd_n = 1;
	            ecb = gfc.s3_ss[j] * eb[kk] * tab[mask_idx_s[kk]];
	            ++j;
	            ++kk;
	            while (kk <= last) {
	                dd += mask_idx_s[kk];
	                dd_n += 1;
	                x = gfc.s3_ss[j] * eb[kk] * tab[mask_idx_s[kk]];
	                ecb = vbrpsy_mask_add(ecb, x, kk - b);
	                ++j;
	                ++kk;
	            }
	            dd = (1 + 2 * dd) / (2 * dd_n);
	            avg_mask = tab[dd] * 0.5;
	            ecb *= avg_mask;
	            thr[b] = ecb;
	            gfc.nb_s2[chn][b] = gfc.nb_s1[chn][b];
	            gfc.nb_s1[chn][b] = ecb;
	            {
	                /*
	                 * if THR exceeds EB, the quantization routines will take the
	                 * difference from other bands. in case of strong tonal samples
	                 * (tonaltest.wav) this leads to heavy distortions. that's why
	                 * we limit THR here.
	                 */
	                x = max[b];
	                x *= gfc.minval_s[b];
	                x *= avg_mask;
	                if (thr[b] > x) {
	                    thr[b] = x;
	                }
	            }
	            if (gfc.masking_lower > 1) {
	                thr[b] *= gfc.masking_lower;
	            }
	            if (thr[b] > eb[b]) {
	                thr[b] = eb[b];
	            }
	            if (gfc.masking_lower < 1) {
	                thr[b] *= gfc.masking_lower;
	            }

	        }
	        for (; b < Encoder.CBANDS; ++b) {
	            eb[b] = 0;
	            thr[b] = 0;
	        }
	    }