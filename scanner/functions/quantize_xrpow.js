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