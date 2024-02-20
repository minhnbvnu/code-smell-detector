function compute_masking_s(gfp, fftenergy_s, eb, thr, chn, sblock) {
	        var gfc = gfp.internal_flags;
	        var j, b;

	        for (b = j = 0; b < gfc.npart_s; ++b) {
	            var ebb = 0, m = 0;
	            var n = gfc.numlines_s[b];
	            for (var i = 0; i < n; ++i, ++j) {
	                var el = fftenergy_s[sblock][j];
	                ebb += el;
	                if (m < el)
	                    m = el;
	            }
	            eb[b] = ebb;
	        }
	        for (j = b = 0; b < gfc.npart_s; b++) {
	            var kk = gfc.s3ind_s[b][0];
	            var ecb = gfc.s3_ss[j++] * eb[kk];
	            ++kk;
	            while (kk <= gfc.s3ind_s[b][1]) {
	                ecb += gfc.s3_ss[j] * eb[kk];
	                ++j;
	                ++kk;
	            }

	            { /* limit calculated threshold by previous granule */
	                var x = rpelev_s * gfc.nb_s1[chn][b];
	                thr[b] = Math.min(ecb, x);
	            }
	            if (gfc.blocktype_old[chn & 1] == Encoder.SHORT_TYPE) {
	                /* limit calculated threshold by even older granule */
	                var x = rpelev2_s * gfc.nb_s2[chn][b];
	                var y = thr[b];
	                thr[b] = Math.min(x, y);
	            }

	            gfc.nb_s2[chn][b] = gfc.nb_s1[chn][b];
	            gfc.nb_s1[chn][b] = ecb;
	        }
	        for (; b <= Encoder.CBANDS; ++b) {
	            eb[b] = 0;
	            thr[b] = 0;
	        }
	    }