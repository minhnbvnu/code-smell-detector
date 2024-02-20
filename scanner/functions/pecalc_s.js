function pecalc_s(mr, masking_lower) {
	        var pe_s = 1236.28 / 4;
	        for (var sb = 0; sb < Encoder.SBMAX_s - 1; sb++) {
	            for (var sblock = 0; sblock < 3; sblock++) {
	                var thm = mr.thm.s[sb][sblock];
	                if (thm > 0.0) {
	                    var x = thm * masking_lower;
	                    var en = mr.en.s[sb][sblock];
	                    if (en > x) {
	                        if (en > x * 1e10) {
	                            pe_s += regcoef_s[sb] * (10.0 * LOG10);
	                        } else {
	                            pe_s += regcoef_s[sb] * Util.FAST_LOG10(en / x);
	                        }
	                    }
	                }
	            }
	        }

	        return pe_s;
	    }