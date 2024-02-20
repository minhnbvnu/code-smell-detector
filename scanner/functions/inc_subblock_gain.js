function inc_subblock_gain(gfc, cod_info, xrpow) {
	        var sfb;
	        var scalefac = cod_info.scalefac;

	        /* subbloc_gain can't do anything in the long block region */
	        for (sfb = 0; sfb < cod_info.sfb_lmax; sfb++) {
	            if (scalefac[sfb] >= 16)
	                return true;
	        }

	        for (var window = 0; window < 3; window++) {
	            var s1 = 0;
	            var s2 = 0;

	            for (sfb = cod_info.sfb_lmax + window; sfb < cod_info.sfbdivide; sfb += 3) {
	                if (s1 < scalefac[sfb])
	                    s1 = scalefac[sfb];
	            }
	            for (; sfb < cod_info.sfbmax; sfb += 3) {
	                if (s2 < scalefac[sfb])
	                    s2 = scalefac[sfb];
	            }

	            if (s1 < 16 && s2 < 8)
	                continue;

	            if (cod_info.subblock_gain[window] >= 7)
	                return true;

	            /*
	             * even though there is no scalefactor for sfb12 subblock gain
	             * affects upper frequencies too, that's why we have to go up to
	             * SBMAX_s
	             */
	            cod_info.subblock_gain[window]++;
	            var j = gfc.scalefac_band.l[cod_info.sfb_lmax];
	            for (sfb = cod_info.sfb_lmax + window; sfb < cod_info.sfbmax; sfb += 3) {
	                var amp;
	                var width = cod_info.width[sfb];
	                var s = scalefac[sfb];
	                s = s - (4 >> cod_info.scalefac_scale);
	                if (s >= 0) {
	                    scalefac[sfb] = s;
	                    j += width * 3;
	                    continue;
	                }

	                scalefac[sfb] = 0;
	                {
	                    var gain = 210 + (s << (cod_info.scalefac_scale + 1));
	                    amp = qupvt.IPOW20(gain);
	                }
	                j += width * (window + 1);
	                for (var l = -width; l < 0; l++) {
	                    xrpow[j + l] *= amp;
	                    if (xrpow[j + l] > cod_info.xrpow_max)
	                        cod_info.xrpow_max = xrpow[j + l];
	                }
	                j += width * (3 - window - 1);
	            }

	            {
	                var amp = qupvt.IPOW20(202);
	                j += cod_info.width[sfb] * (window + 1);
	                for (var l = -cod_info.width[sfb]; l < 0; l++) {
	                    xrpow[j + l] *= amp;
	                    if (xrpow[j + l] > cod_info.xrpow_max)
	                        cod_info.xrpow_max = xrpow[j + l];
	                }
	            }
	        }
	        return false;
	    }