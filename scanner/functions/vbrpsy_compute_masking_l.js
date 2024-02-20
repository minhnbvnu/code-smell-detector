function vbrpsy_compute_masking_l(gfc, fftenergy, eb_l, thr, chn) {
	        var max = new_float(Encoder.CBANDS), avg = new_float(Encoder.CBANDS);
	        var mask_idx_l = new_int(Encoder.CBANDS + 2);
	        var b;

	        /*********************************************************************
	         * Calculate the energy and the tonality of each partition.
	         *********************************************************************/
	        calc_energy(gfc, fftenergy, eb_l, max, avg);
	        calc_mask_index_l(gfc, max, avg, mask_idx_l);

	        /*********************************************************************
	         * convolve the partitioned energy and unpredictability with the
	         * spreading function, s3_l[b][k]
	         ********************************************************************/
	        var k = 0;
	        for (b = 0; b < gfc.npart_l; b++) {
	            var x, ecb, avg_mask, t;
	            /* convolve the partitioned energy with the spreading function */
	            var kk = gfc.s3ind[b][0];
	            var last = gfc.s3ind[b][1];
	            var dd = 0, dd_n = 0;
	            dd = mask_idx_l[kk];
	            dd_n += 1;
	            ecb = gfc.s3_ll[k] * eb_l[kk] * tab[mask_idx_l[kk]];
	            ++k;
	            ++kk;
	            while (kk <= last) {
	                dd += mask_idx_l[kk];
	                dd_n += 1;
	                x = gfc.s3_ll[k] * eb_l[kk] * tab[mask_idx_l[kk]];
	                t = vbrpsy_mask_add(ecb, x, kk - b);
	                ecb = t;
	                ++k;
	                ++kk;
	            }
	            dd = (1 + 2 * dd) / (2 * dd_n);
	            avg_mask = tab[dd] * 0.5;
	            ecb *= avg_mask;

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
	             * chn=0,1 L and R channels chn=2,3 S and M channels.
	             */
	            if (gfc.blocktype_old[chn & 0x01] == Encoder.SHORT_TYPE) {
	                var ecb_limit = rpelev * gfc.nb_1[chn][b];
	                if (ecb_limit > 0) {
	                    thr[b] = Math.min(ecb, ecb_limit);
	                } else {
	                    /**
	                     * <PRE>
	                     * Robert 071209:
	                     * Because we don't calculate long block psy when we know a granule
	                     * should be of short blocks, we don't have any clue how the granule
	                     * before would have looked like as a long block. So we have to guess
	                     * a little bit for this END_TYPE block.
	                     * Most of the time we get away with this sloppyness. (fingers crossed :)
	                     * The speed increase is worth it.
	                     * </PRE>
	                     */
	                    thr[b] = Math.min(ecb, eb_l[b] * NS_PREECHO_ATT2);
	                }
	            } else {
	                var ecb_limit_2 = rpelev2 * gfc.nb_2[chn][b];
	                var ecb_limit_1 = rpelev * gfc.nb_1[chn][b];
	                var ecb_limit;
	                if (ecb_limit_2 <= 0) {
	                    ecb_limit_2 = ecb;
	                }
	                if (ecb_limit_1 <= 0) {
	                    ecb_limit_1 = ecb;
	                }
	                if (gfc.blocktype_old[chn & 0x01] == Encoder.NORM_TYPE) {
	                    ecb_limit = Math.min(ecb_limit_1, ecb_limit_2);
	                } else {
	                    ecb_limit = ecb_limit_1;
	                }
	                thr[b] = Math.min(ecb, ecb_limit);
	            }
	            gfc.nb_2[chn][b] = gfc.nb_1[chn][b];
	            gfc.nb_1[chn][b] = ecb;
	            {
	                /*
	                 * if THR exceeds EB, the quantization routines will take the
	                 * difference from other bands. in case of strong tonal samples
	                 * (tonaltest.wav) this leads to heavy distortions. that's why
	                 * we limit THR here.
	                 */
	                x = max[b];
	                x *= gfc.minval_l[b];
	                x *= avg_mask;
	                if (thr[b] > x) {
	                    thr[b] = x;
	                }
	            }
	            if (gfc.masking_lower > 1) {
	                thr[b] *= gfc.masking_lower;
	            }
	            if (thr[b] > eb_l[b]) {
	                thr[b] = eb_l[b];
	            }
	            if (gfc.masking_lower < 1) {
	                thr[b] *= gfc.masking_lower;
	            }
	        }
	        for (; b < Encoder.CBANDS; ++b) {
	            eb_l[b] = 0;
	            thr[b] = 0;
	        }
	    }