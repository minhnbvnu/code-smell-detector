function quantize_lines_xrpow(l, istep, xr, xrPos, ix, ixPos) {

	        l = l >> 1;
	        var remaining = l % 2;
	        l = l >> 1;
	        while (l-- != 0) {
	            var x0, x1, x2, x3;
	            var rx0, rx1, rx2, rx3;

	            x0 = xr[xrPos++] * istep;
	            x1 = xr[xrPos++] * istep;
	            rx0 = 0 | x0;
	            x2 = xr[xrPos++] * istep;
	            rx1 = 0 | x1;
	            x3 = xr[xrPos++] * istep;
	            rx2 = 0 | x2;
	            x0 += qupvt.adj43[rx0];
	            rx3 = 0 | x3;
	            x1 += qupvt.adj43[rx1];
	            ix[ixPos++] = 0 | x0;
	            x2 += qupvt.adj43[rx2];
	            ix[ixPos++] = 0 | x1;
	            x3 += qupvt.adj43[rx3];
	            ix[ixPos++] = 0 | x2;
	            ix[ixPos++] = 0 | x3;
	        }
	        if (remaining != 0) {
	            var x0, x1;
	            var rx0, rx1;

	            x0 = xr[xrPos++] * istep;
	            x1 = xr[xrPos++] * istep;
	            rx0 = 0 | x0;
	            rx1 = 0 | x1;
	            x0 += qupvt.adj43[rx0];
	            x1 += qupvt.adj43[rx1];
	            ix[ixPos++] = 0 | x0;
	            ix[ixPos++] = 0 | x1;
	        }
	    }