function TimestampsDiscrepancy(timestamps, absolute, location_count) {
	absolute = typeof absolute === 'undefined' ? true : absolute;
	location_count = typeof location_count === 'undefined' ? null : location_count;

	if (!timestamps) {
		return 0;
	}

	var normal = NormalizeSamples(timestamps);
	var samples = normal.samples,
		sample_scale = normal.scale;
	var discrepancy = Discrepancy(samples, location_count);
	var inv_sample_count = 1.0 / samples.length;

	if (absolute)
		discrepancy /= sample_scale;
	else
		discrepancy = Clamp((discrepancy - inv_sample_count) / (1.0 - inv_sample_count));
	return discrepancy;
}