function getUnitVector(x, y) {
	    var d = Math.sqrt(x * x + y * y);

	    x /= d;
	    y /= d;

	    if (x === 1 && y === 0) { return xUnitVector; }
	    else if (x === 0 && y === 1) { return yUnitVector; }
	    else { return new UnitVector(x, y); }
	}