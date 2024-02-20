function blackman(x, fcn, l) {
	        /*
	         * This algorithm from: SIGNAL PROCESSING ALGORITHMS IN FORTRAN AND C
	         * S.D. Stearns and R.A. David, Prentice-Hall, 1992
	         */
	        var wcn = (Math.PI * fcn);

	        x /= l;
	        if (x < 0)
	            x = 0;
	        if (x > 1)
	            x = 1;
	        var x2 = x - .5;

	        var bkwn = 0.42 - 0.5 * Math.cos(2 * x * Math.PI) + 0.08 * Math.cos(4 * x * Math.PI);
	        if (Math.abs(x2) < 1e-9)
	            return (wcn / Math.PI);
	        else
	            return (bkwn * Math.sin(l * wcn * x2) / (Math.PI * l * x2));
	    }