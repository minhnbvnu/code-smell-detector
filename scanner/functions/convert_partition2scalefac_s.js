function convert_partition2scalefac_s(gfc, eb, thr, chn, sblock) {
	        var sb, b;
	        var enn = 0.0;
	        var thmm = 0.0;
	        for (sb = b = 0; sb < Encoder.SBMAX_s; ++b, ++sb) {
	            var bo_s_sb = gfc.bo_s[sb];
	            var npart_s = gfc.npart_s;
	            var b_lim = bo_s_sb < npart_s ? bo_s_sb : npart_s;
	            while (b < b_lim) {
	                // iff failed, it may indicate some index error elsewhere
	                enn += eb[b];
	                thmm += thr[b];
	                b++;
	            }
	            gfc.en[chn].s[sb][sblock] = enn;
	            gfc.thm[chn].s[sb][sblock] = thmm;

	            if (b >= npart_s) {
	                ++sb;
	                break;
	            }
	            // iff failed, it may indicate some index error elsewhere
	            {
	                /* at transition sfb . sfb+1 */
	                var w_curr = gfc.PSY.bo_s_weight[sb];
	                var w_next = 1.0 - w_curr;
	                enn = w_curr * eb[b];
	                thmm = w_curr * thr[b];
	                gfc.en[chn].s[sb][sblock] += enn;
	                gfc.thm[chn].s[sb][sblock] += thmm;
	                enn = w_next * eb[b];
	                thmm = w_next * thr[b];
	            }
	        }
	        /* zero initialize the rest */
	        for (; sb < Encoder.SBMAX_s; ++sb) {
	            gfc.en[chn].s[sb][sblock] = 0;
	            gfc.thm[chn].s[sb][sblock] = 0;
	        }
	    }