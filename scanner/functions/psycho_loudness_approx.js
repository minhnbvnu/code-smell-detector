function psycho_loudness_approx(energy, gfc) {
	        var loudness_power = 0.0;
	        /* apply weights to power in freq. bands */
	        for (var i = 0; i < Encoder.BLKSIZE / 2; ++i)
	            loudness_power += energy[i] * gfc.ATH.eql_w[i];
	        loudness_power *= VO_SCALE;

	        return loudness_power;
	    }