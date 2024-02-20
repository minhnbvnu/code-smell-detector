function normalizeTimeTickInterval(tickInterval, unitsOption) {
	var units = unitsOption || [[
				MILLISECOND, // unit name
				[1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
			], [
				SECOND,
				[1, 2, 5, 10, 15, 30]
			], [
				MINUTE,
				[1, 2, 5, 10, 15, 30]
			], [
				HOUR,
				[1, 2, 3, 4, 6, 8, 12]
			], [
				DAY,
				[1, 2]
			], [
				WEEK,
				[1, 2]
			], [
				MONTH,
				[1, 2, 3, 4, 6]
			], [
				YEAR,
				null
			]],
		unit = units[units.length - 1], // default unit is years
		interval = timeUnits[unit[0]],
		multiples = unit[1],
		count,
		i;
		
	// loop through the units to find the one that best fits the tickInterval
	for (i = 0; i < units.length; i++) {
		unit = units[i];
		interval = timeUnits[unit[0]];
		multiples = unit[1];


		if (units[i + 1]) {
			// lessThan is in the middle between the highest multiple and the next unit.
			var lessThan = (interval * multiples[multiples.length - 1] +
						timeUnits[units[i + 1][0]]) / 2;

			// break and keep the current unit
			if (tickInterval <= lessThan) {
				break;
			}
		}
	}

	// prevent 2.5 years intervals, though 25, 250 etc. are allowed
	if (interval === timeUnits[YEAR] && tickInterval < 5 * interval) {
		multiples = [1, 2, 5];
	}

	// get the count
	count = normalizeTickInterval(
		tickInterval / interval, 
		multiples,
		unit[0] === YEAR ? getMagnitude(tickInterval / interval) : 1 // #1913
	);
	
	return {
		unitRange: interval,
		count: count,
		unitName: unit[0]
	};
}