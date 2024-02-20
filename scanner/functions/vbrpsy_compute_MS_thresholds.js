function vbrpsy_compute_MS_thresholds(eb, thr, cb_mld, ath_cb, athadjust, msfix, n) {
	        var msfix2 = msfix * 2;
	        var athlower = msfix > 0 ? Math.pow(10, athadjust) : 1;
	        var rside, rmid;
	        for (var b = 0; b < n; ++b) {
	            var ebM = eb[2][b];
	            var ebS = eb[3][b];
	            var thmL = thr[0][b];
	            var thmR = thr[1][b];
	            var thmM = thr[2][b];
	            var thmS = thr[3][b];

	            /* use this fix if L & R masking differs by 2db or less */
	            if (thmL <= 1.58 * thmR && thmR <= 1.58 * thmL) {
	                var mld_m = cb_mld[b] * ebS;
	                var mld_s = cb_mld[b] * ebM;
	                rmid = Math.max(thmM, Math.min(thmS, mld_m));
	                rside = Math.max(thmS, Math.min(thmM, mld_s));
	            } else {
	                rmid = thmM;
	                rside = thmS;
	            }
	            if (msfix > 0) {
	                /***************************************************************/
	                /* Adjust M/S maskings if user set "msfix" */
	                /***************************************************************/
	                /* Naoki Shibata 2000 */
	                var thmLR, thmMS;
	                var ath = ath_cb[b] * athlower;
	                thmLR = Math.min(Math.max(thmL, ath), Math.max(thmR, ath));
	                thmM = Math.max(rmid, ath);
	                thmS = Math.max(rside, ath);
	                thmMS = thmM + thmS;
	                if (thmMS > 0 && (thmLR * msfix2) < thmMS) {
	                    var f = thmLR * msfix2 / thmMS;
	                    thmM *= f;
	                    thmS *= f;
	                }
	                rmid = Math.min(thmM, rmid);
	                rside = Math.min(thmS, rside);
	            }
	            if (rmid > ebM) {
	                rmid = ebM;
	            }
	            if (rside > ebS) {
	                rside = ebS;
	            }
	            thr[2][b] = rmid;
	            thr[3][b] = rside;
	        }
	    }