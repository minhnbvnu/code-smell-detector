function Human(year) {
		var privateVar = 1;
		this.year = year;
		this.isOld = function() {
			return year > 80;
		};
	}