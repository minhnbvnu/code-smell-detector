function convert_partition2scalefac_l(gfc, eb, thr, chn) {
	        var sb, b;
	        var enn = 0.0;
	        var thmm = 0.0;
	        for (sb = b = 0; sb < Encoder.SBMAX_l; ++b, ++sb) {
	            var bo_l_sb = gfc.bo_l[sb];
	            var npart_l = gfc.npart_l;
	            var b_lim = bo_l_sb < npart_l ? bo_l_sb : npart_l;
	            while (b < b_lim) {
	                // iff failed, it may indicate some index error elsewhere
	                enn += eb[b];
	                thmm += thr[b];
	                b++;
	            }
	            gfc.en[chn].l[sb] = enn;
	            gfc.thm[chn].l[sb] = thmm;

	            if (b >= npart_l) {
	                ++sb;
	                break;
	            }
	            {
	                /* at transition sfb . sfb+1 */
	                var w_curr = gfc.PSY.bo_l_weight[sb];
	                var w_next = 1.0 - w_curr;
	                enn = w_curr * eb[b];
	                thmm = w_curr * thr[b];
	                gfc.en[chn].l[sb] += enn;
	                gfc.thm[chn].l[sb] += thmm;
	                enn = w_next * eb[b];
	                thmm = w_next * thr[b];
	            }
	        }
	        /* zero initialize the rest */
	        for (; sb < Encoder.SBMAX_l; ++sb) {
	            gfc.en[chn].l[sb] = 0;
	            gfc.thm[chn].l[sb] = 0;
	        }
	    }