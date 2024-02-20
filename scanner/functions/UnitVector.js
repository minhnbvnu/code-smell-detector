function UnitVector(x, y) {
	    this.x = x;
	    this.y = y;
	    this.axis = undefined;
	    this.slope = y / x;
	    this.normalSlope = -x / y;
	    Object.freeze(this);
	}