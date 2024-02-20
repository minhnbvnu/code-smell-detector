function inc_scalefac_scale(cod_info, xrpow) {
	        var ifqstep34 = 1.29683955465100964055;

	        var j = 0;
	        for (var sfb = 0; sfb < cod_info.sfbmax; sfb++) {
	            var width = cod_info.width[sfb];
	            var s = cod_info.scalefac[sfb];
	            if (cod_info.preflag != 0)
	                s += qupvt.pretab[sfb];
	            j += width;
	            if ((s & 1) != 0) {
	                s++;
	                for (var l = -width; l < 0; l++) {
	                    xrpow[j + l] *= ifqstep34;
	                    if (xrpow[j + l] > cod_info.xrpow_max)
	                        cod_info.xrpow_max = xrpow[j + l];
	                }
	            }
	            cod_info.scalefac[sfb] = s >> 1;
	        }
	        cod_info.preflag = 0;
	        cod_info.scalefac_scale = 1;
	    }