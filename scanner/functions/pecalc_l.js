function pecalc_l(mr, masking_lower) {
	        var pe_l = 1124.23 / 4;
	        for (var sb = 0; sb < Encoder.SBMAX_l - 1; sb++) {
	            var thm = mr.thm.l[sb];
	            if (thm > 0.0) {
	                var x = thm * masking_lower;
	                var en = mr.en.l[sb];
	                if (en > x) {
	                    if (en > x * 1e10) {
	                        pe_l += regcoef_l[sb] * (10.0 * LOG10);
	                    } else {
	                        pe_l += regcoef_l[sb] * Util.FAST_LOG10(en / x);
	                    }
	                }
	            }
	        }
	        return pe_l;
	    }