function amp_scalefac_bands(gfp, cod_info, distort, xrpow, bRefine) {
	        var gfc = gfp.internal_flags;
	        var ifqstep34;

	        if (cod_info.scalefac_scale == 0) {
	            ifqstep34 = 1.29683955465100964055;
	            /* 2**(.75*.5) */
	        } else {
	            ifqstep34 = 1.68179283050742922612;
	            /* 2**(.75*1) */
	        }

	        /* compute maximum value of distort[] */
	        var trigger = 0;
	        for (var sfb = 0; sfb < cod_info.sfbmax; sfb++) {
	            if (trigger < distort[sfb])
	                trigger = distort[sfb];
	        }

	        var noise_shaping_amp = gfc.noise_shaping_amp;
	        if (noise_shaping_amp == 3) {
	            if (bRefine)
	                noise_shaping_amp = 2;
	            else
	                noise_shaping_amp = 1;
	        }
	        switch (noise_shaping_amp) {
	            case 2:
	                /* amplify exactly 1 band */
	                break;

	            case 1:
	                /* amplify bands within 50% of max (on db scale) */
	                if (trigger > 1.0)
	                    trigger = Math.pow(trigger, .5);
	                else
	                    trigger *= .95;
	                break;

	            case 0:
	            default:
	                /* ISO algorithm. amplify all bands with distort>1 */
	                if (trigger > 1.0)
	                    trigger = 1.0;
	                else
	                    trigger *= .95;
	                break;
	        }

	        var j = 0;
	        for (var sfb = 0; sfb < cod_info.sfbmax; sfb++) {
	            var width = cod_info.width[sfb];
	            var l;
	            j += width;
	            if (distort[sfb] < trigger)
	                continue;

	            if ((gfc.substep_shaping & 2) != 0) {
	                gfc.pseudohalf[sfb] = (0 == gfc.pseudohalf[sfb]) ? 1 : 0;
	                if (0 == gfc.pseudohalf[sfb] && gfc.noise_shaping_amp == 2)
	                    return;
	            }
	            cod_info.scalefac[sfb]++;
	            for (l = -width; l < 0; l++) {
	                xrpow[j + l] *= ifqstep34;
	                if (xrpow[j + l] > cod_info.xrpow_max)
	                    cod_info.xrpow_max = xrpow[j + l];
	            }

	            if (gfc.noise_shaping_amp == 2)
	                return;
	        }
	    }