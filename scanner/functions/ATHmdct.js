function ATHmdct(gfp, f) {
	        var ath = psy.ATHformula(f, gfp);

	        ath -= NSATHSCALE;

	        /* modify the MDCT scaling for the ATH and convert to energy */
	        ath = Math.pow(10.0, ath / 10.0 + gfp.ATHlower);
	        return ath;
	    }