function init_xrpow_core(cod_info, xrpow, upper, sum) {
	        sum = 0;
	        for (var i = 0; i <= upper; ++i) {
	            var tmp = Math.abs(cod_info.xr[i]);
	            sum += tmp;
	            xrpow[i] = Math.sqrt(tmp * Math.sqrt(tmp));

	            if (xrpow[i] > cod_info.xrpow_max)
	                cod_info.xrpow_max = xrpow[i];
	        }
	        return sum;
	    }