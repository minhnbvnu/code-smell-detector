function msfix1(gfc) {
	        for (var sb = 0; sb < Encoder.SBMAX_l; sb++) {
	            /* use this fix if L & R masking differs by 2db or less */
	            /* if db = 10*log10(x2/x1) < 2 */
	            /* if (x2 < 1.58*x1) { */
	            if (gfc.thm[0].l[sb] > 1.58 * gfc.thm[1].l[sb]
	                || gfc.thm[1].l[sb] > 1.58 * gfc.thm[0].l[sb])
	                continue;
	            var mld = gfc.mld_l[sb] * gfc.en[3].l[sb];
	            var rmid = Math.max(gfc.thm[2].l[sb],
	                Math.min(gfc.thm[3].l[sb], mld));

	            mld = gfc.mld_l[sb] * gfc.en[2].l[sb];
	            var rside = Math.max(gfc.thm[3].l[sb],
	                Math.min(gfc.thm[2].l[sb], mld));
	            gfc.thm[2].l[sb] = rmid;
	            gfc.thm[3].l[sb] = rside;
	        }

	        for (var sb = 0; sb < Encoder.SBMAX_s; sb++) {
	            for (var sblock = 0; sblock < 3; sblock++) {
	                if (gfc.thm[0].s[sb][sblock] > 1.58 * gfc.thm[1].s[sb][sblock]
	                    || gfc.thm[1].s[sb][sblock] > 1.58 * gfc.thm[0].s[sb][sblock])
	                    continue;
	                var mld = gfc.mld_s[sb] * gfc.en[3].s[sb][sblock];
	                var rmid = Math.max(gfc.thm[2].s[sb][sblock],
	                    Math.min(gfc.thm[3].s[sb][sblock], mld));

	                mld = gfc.mld_s[sb] * gfc.en[2].s[sb][sblock];
	                var rside = Math.max(gfc.thm[3].s[sb][sblock],
	                    Math.min(gfc.thm[2].s[sb][sblock], mld));

	                gfc.thm[2].s[sb][sblock] = rmid;
	                gfc.thm[3].s[sb][sblock] = rside;
	            }
	        }
	    }