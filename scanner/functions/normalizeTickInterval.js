function normalizeTickInterval(interval, multiples, magnitude, options) {
	var normalized, i;

	// round to a tenfold of 1, 2, 2.5 or 5
	magnitude = pick(magnitude, 1);
	normalized = interval / magnitude;

	// multiples for a linear scale
	if (!multiples) {
		multiples = [1, 2, 2.5, 5, 10];

		// the allowDecimals option
		if (options && options.allowDecimals === false) {
			if (magnitude === 1) {
				multiples = [1, 2, 5, 10];
			} else if (magnitude <= 0.1) {
				multiples = [1 / magnitude];
			}
		}
	}

	// normalize the interval to the nearest multiple
	for (i = 0; i < multiples.length; i++) {
		interval = multiples[i];
		if (normalized <= (multiples[i] + (multiples[i + 1] || multiples[i])) / 2) {
			break;
		}
	}

	// multiply back to the correct magnitude
	interval *= magnitude;

	return interval;
}