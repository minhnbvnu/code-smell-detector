function roundToHalfGrid(v) {
	    return Math.sign(v) * (Math.round(Math.abs(v) + 0.5) - 0.5);
	}