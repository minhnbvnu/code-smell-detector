function Discrepancy(samples, location_count) {
	if (!samples) {
		return 0;
	}

	var max_local_discrepancy = 0;
	var inv_sample_count = 1.0 / samples.length;
	var locations = [],
		count_less = [],
		count_less_equal = [];

	if (location_count) {
		//Generate list of equally spaced locations.
		var sample_index = 0;
		for (var i = 0; i < location_count; i++) {
			var location = i / location_count - 1;
			locations.push(location);
			while (sample_index < samples.length && samples[sample_index] < location)
				sample_index += 1;
			count_less.push(sample_index);
			while (sample_index < samples.length && samples[sample_index] <= location)
				sample_index += 1;
			count_less_equal.push(sample_index);
		}
	} else {
		if (samples[0] > 0.0) {
			locations.push(0.0);
			count_less.push(0);
			count_less_equal.push(0);
		}
		for (var i = 0; i < samples.length; i++) {
			locations.push(samples[i]);
			count_less.push(i);
			count_less_equal.push(i + 1);
		}
		if (samples[-1] < 1.0) {
			locations.push(1.0);
			count_less.push(samples.length);
			count_less_equal.push(samples.length);
		}
	}

	// Iterate over the intervals defined by any pair of locations.
	for (var i = 0; i < locations.length; i++) {
		for (var j = i + 1; j < locations.length; j++) {
			// # Length of interval
			var length = locations[j] - locations[i];

			// Local discrepancy for closed interval
			var count_closed = count_less_equal[j] - count_less[i];
			var local_discrepancy_closed = Math.abs(count_closed * inv_sample_count - length);
			var max_local_discrepancy = Math.max(local_discrepancy_closed, max_local_discrepancy);

			// Local discrepancy for open interval
			var count_open = count_less[j] - count_less_equal[i];
			var local_discrepancy_open = Math.abs(count_open * inv_sample_count - length);
			var max_local_discrepancy = Math.max(local_discrepancy_open, max_local_discrepancy);
		}
	}
	return max_local_discrepancy;
}