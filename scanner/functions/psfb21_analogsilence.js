function psfb21_analogsilence(gfc, cod_info) {
	        var ath = gfc.ATH;
	        var xr = cod_info.xr;

	        if (cod_info.block_type != Encoder.SHORT_TYPE) {
	            /* NORM, START or STOP type, but not SHORT blocks */
	            var stop = false;
	            for (var gsfb = Encoder.PSFB21 - 1; gsfb >= 0 && !stop; gsfb--) {
	                var start = gfc.scalefac_band.psfb21[gsfb];
	                var end = gfc.scalefac_band.psfb21[gsfb + 1];
	                var ath21 = qupvt.athAdjust(ath.adjust, ath.psfb21[gsfb],
	                    ath.floor);

	                if (gfc.nsPsy.longfact[21] > 1e-12)
	                    ath21 *= gfc.nsPsy.longfact[21];

	                for (var j = end - 1; j >= start; j--) {
	                    if (Math.abs(xr[j]) < ath21)
	                        xr[j] = 0;
	                    else {
	                        stop = true;
	                        break;
	                    }
	                }
	            }
	        } else {
	            /* note: short blocks coeffs are reordered */
	            for (var block = 0; block < 3; block++) {
	                var stop = false;
	                for (var gsfb = Encoder.PSFB12 - 1; gsfb >= 0 && !stop; gsfb--) {
	                    var start = gfc.scalefac_band.s[12]
	                        * 3
	                        + (gfc.scalefac_band.s[13] - gfc.scalefac_band.s[12])
	                        * block
	                        + (gfc.scalefac_band.psfb12[gsfb] - gfc.scalefac_band.psfb12[0]);
	                    var end = start
	                        + (gfc.scalefac_band.psfb12[gsfb + 1] - gfc.scalefac_band.psfb12[gsfb]);
	                    var ath12 = qupvt.athAdjust(ath.adjust, ath.psfb12[gsfb],
	                        ath.floor);

	                    if (gfc.nsPsy.shortfact[12] > 1e-12)
	                        ath12 *= gfc.nsPsy.shortfact[12];

	                    for (var j = end - 1; j >= start; j--) {
	                        if (Math.abs(xr[j]) < ath12)
	                            xr[j] = 0;
	                        else {
	                            stop = true;
	                            break;
	                        }
	                    }
	                }
	            }
	        }

	    }