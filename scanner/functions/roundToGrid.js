function roundToGrid(v) {
	    //Rounding in TT is supposed to "symmetrical around zero"
	    return Math.sign(v) * Math.round(Math.abs(v));
	}