function ns_msfix(gfc, msfix, athadjust) {
	        var msfix2 = msfix;
	        var athlower = Math.pow(10, athadjust);

	        msfix *= 2.0;
	        msfix2 *= 2.0;
	        for (var sb = 0; sb < Encoder.SBMAX_l; sb++) {
	            var thmLR, thmM, thmS, ath;
	            ath = (gfc.ATH.cb_l[gfc.bm_l[sb]]) * athlower;
	            thmLR = Math.min(Math.max(gfc.thm[0].l[sb], ath),
	                Math.max(gfc.thm[1].l[sb], ath));
	            thmM = Math.max(gfc.thm[2].l[sb], ath);
	            thmS = Math.max(gfc.thm[3].l[sb], ath);
	            if (thmLR * msfix < thmM + thmS) {
	                var f = thmLR * msfix2 / (thmM + thmS);
	                thmM *= f;
	                thmS *= f;
	            }
	            gfc.thm[2].l[sb] = Math.min(thmM, gfc.thm[2].l[sb]);
	            gfc.thm[3].l[sb] = Math.min(thmS, gfc.thm[3].l[sb]);
	        }

	        athlower *= ( Encoder.BLKSIZE_s / Encoder.BLKSIZE);
	        for (var sb = 0; sb < Encoder.SBMAX_s; sb++) {
	            for (var sblock = 0; sblock < 3; sblock++) {
	                var thmLR, thmM, thmS, ath;
	                ath = (gfc.ATH.cb_s[gfc.bm_s[sb]]) * athlower;
	                thmLR = Math.min(Math.max(gfc.thm[0].s[sb][sblock], ath),
	                    Math.max(gfc.thm[1].s[sb][sblock], ath));
	                thmM = Math.max(gfc.thm[2].s[sb][sblock], ath);
	                thmS = Math.max(gfc.thm[3].s[sb][sblock], ath);

	                if (thmLR * msfix < thmM + thmS) {
	                    var f = thmLR * msfix / (thmM + thmS);
	                    thmM *= f;
	                    thmS *= f;
	                }
	                gfc.thm[2].s[sb][sblock] = Math.min(gfc.thm[2].s[sb][sblock],
	                    thmM);
	                gfc.thm[3].s[sb][sblock] = Math.min(gfc.thm[3].s[sb][sblock],
	                    thmS);
	            }
	        }
	    }