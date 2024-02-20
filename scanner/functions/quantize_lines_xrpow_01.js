function quantize_lines_xrpow_01(l, istep, xr, xrPos, ix, ixPos) {
	        var compareval0 = (1.0 - 0.4054) / istep;

	        l = l >> 1;
	        while ((l--) != 0) {
	            ix[ixPos++] = (compareval0 > xr[xrPos++]) ? 0 : 1;
	            ix[ixPos++] = (compareval0 > xr[xrPos++]) ? 0 : 1;
	        }
	    }