function calc_energy(gfc, fftenergy, eb, max, avg) {
	        var b, j;

	        for (b = j = 0; b < gfc.npart_l; ++b) {
	            var ebb = 0, m = 0;
	            var i;
	            for (i = 0; i < gfc.numlines_l[b]; ++i, ++j) {
	                var el = fftenergy[j];
	                ebb += el;
	                if (m < el)
	                    m = el;
	            }
	            eb[b] = ebb;
	            max[b] = m;
	            avg[b] = ebb * gfc.rnumlines_l[b];
	        }
	    }