function Car(year) {
		var privateVar = 0;
		this.year = year;
		this.isOld = function() {
			return year > 10;
		};
	}