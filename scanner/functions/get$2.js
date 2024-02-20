function get$2 (units) {
	        units = normalizeUnits(units);
	        return this.isValid() ? this[units + 's']() : NaN;
	    }