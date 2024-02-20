function calc_interchannel_masking(gfp, ratio) {
	        var gfc = gfp.internal_flags;
	        if (gfc.channels_out > 1) {
	            for (var sb = 0; sb < Encoder.SBMAX_l; sb++) {
	                var l = gfc.thm[0].l[sb];
	                var r = gfc.thm[1].l[sb];
	                gfc.thm[0].l[sb] += r * ratio;
	                gfc.thm[1].l[sb] += l * ratio;
	            }
	            for (var sb = 0; sb < Encoder.SBMAX_s; sb++) {
	                for (var sblock = 0; sblock < 3; sblock++) {
	                    var l = gfc.thm[0].s[sb][sblock];
	                    var r = gfc.thm[1].s[sb][sblock];
	                    gfc.thm[0].s[sb][sblock] += r * ratio;
	                    gfc.thm[1].s[sb][sblock] += l * ratio;
	                }
	            }
	        }
	    }