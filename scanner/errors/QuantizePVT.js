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