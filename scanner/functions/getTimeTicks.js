function getTimeTicks(normalizedInterval, min, max, startOfWeek) {
	var tickPositions = [],
		i,
		higherRanks = {},
		useUTC = defaultOptions.global.useUTC,
		minYear, // used in months and years as a basis for Date.UTC()
		minDate = new Date(min),
		interval = normalizedInterval.unitRange,
		count = normalizedInterval.count;

	if (defined(min)) { // #1300
		if (interval >= timeUnits[SECOND]) { // second
			minDate.setMilliseconds(0);
			minDate.setSeconds(interval >= timeUnits[MINUTE] ? 0 :
				count * mathFloor(minDate.getSeconds() / count));
		}
	
		if (interval >= timeUnits[MINUTE]) { // minute
			minDate[setMinutes](interval >= timeUnits[HOUR] ? 0 :
				count * mathFloor(minDate[getMinutes]() / count));
		}
	
		if (interval >= timeUnits[HOUR]) { // hour
			minDate[setHours](interval >= timeUnits[DAY] ? 0 :
				count * mathFloor(minDate[getHours]() / count));
		}
	
		if (interval >= timeUnits[DAY]) { // day
			minDate[setDate](interval >= timeUnits[MONTH] ? 1 :
				count * mathFloor(minDate[getDate]() / count));
		}
	
		if (interval >= timeUnits[MONTH]) { // month
			minDate[setMonth](interval >= timeUnits[YEAR] ? 0 :
				count * mathFloor(minDate[getMonth]() / count));
			minYear = minDate[getFullYear]();
		}
	
		if (interval >= timeUnits[YEAR]) { // year
			minYear -= minYear % count;
			minDate[setFullYear](minYear);
		}
	
		// week is a special case that runs outside the hierarchy
		if (interval === timeUnits[WEEK]) {
			// get start of current week, independent of count
			minDate[setDate](minDate[getDate]() - minDate[getDay]() +
				pick(startOfWeek, 1));
		}
	
	
		// get tick positions
		i = 1;
		minYear = minDate[getFullYear]();
		var time = minDate.getTime(),
			minMonth = minDate[getMonth](),
			minDateDate = minDate[getDate](),
			timezoneOffset = useUTC ? 
				0 : 
				(24 * 3600 * 1000 + minDate.getTimezoneOffset() * 60 * 1000) % (24 * 3600 * 1000); // #950
	
		// iterate and add tick positions at appropriate values
		while (time < max) {
			tickPositions.push(time);
	
			// if the interval is years, use Date.UTC to increase years
			if (interval === timeUnits[YEAR]) {
				time = makeTime(minYear + i * count, 0);
	
			// if the interval is months, use Date.UTC to increase months
			} else if (interval === timeUnits[MONTH]) {
				time = makeTime(minYear, minMonth + i * count);
	
			// if we're using global time, the interval is not fixed as it jumps
			// one hour at the DST crossover
			} else if (!useUTC && (interval === timeUnits[DAY] || interval === timeUnits[WEEK])) {
				time = makeTime(minYear, minMonth, minDateDate +
					i * count * (interval === timeUnits[DAY] ? 1 : 7));
	
			// else, the interval is fixed and we use simple addition
			} else {
				time += interval * count;
			}
	
			i++;
		}
	
		// push the last time
		tickPositions.push(time);


		// mark new days if the time is dividible by day (#1649, #1760)
		each(grep(tickPositions, function (time) {
			return interval <= timeUnits[HOUR] && time % timeUnits[DAY] === timezoneOffset;
		}), function (time) {
			higherRanks[time] = DAY;
		});
	}


	// record information on the chosen unit - for dynamic label formatter
	tickPositions.info = extend(normalizedInterval, {
		higherRanks: higherRanks,
		totalRange: interval * count
	});

	return tickPositions;
}