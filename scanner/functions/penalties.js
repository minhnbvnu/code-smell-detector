function penalties(noise) {
	        return Util.FAST_LOG10((0.368 + 0.632 * noise * noise * noise));
	    }