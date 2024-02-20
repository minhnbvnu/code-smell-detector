function get_klemm_noise(distort, gi) {
	        var klemm_noise = 1E-37;
	        for (var sfb = 0; sfb < gi.psymax; sfb++)
	            klemm_noise += penalties(distort[sfb]);

	        return Math.max(1e-20, klemm_noise);
	    }