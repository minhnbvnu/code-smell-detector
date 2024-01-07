function checkFraction(startFraction, endFraction) {
	    assert(startFraction >= 0 && startFraction <= 1, function () {
	      return "Progress fraction must be in range [0, 1], but " + ("got startFraction " + startFraction);
	    });
	    assert(endFraction >= 0 && endFraction <= 1, function () {
	      return "Progress fraction must be in range [0, 1], but " + ("got endFraction " + endFraction);
	    });
	    assert(endFraction >= startFraction, function () {
	      return "startFraction must be no more than endFraction, but " + ("got startFraction " + startFraction + " and endFraction ") + ("" + endFraction);
	    });
	  }