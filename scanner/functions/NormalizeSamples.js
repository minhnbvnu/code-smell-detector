function NormalizeSamples(samples) {
	if (!samples) {
		return 1;
	}
	samples = samples.sort();
	var low = Math.min.apply(null, samples);
	var high = Math.max.apply(null, samples);
	var new_low = 0.5 / samples.length;
	var new_high = (samples.length - 0.5) / samples.length;
	if (high - low == 0.0) {
		return {
			samples: samples.map(function(s) {
				return 0.5;
			}),
			scale: 1
		}
	}
	var scale = (new_high - new_low) / (high - low);
	for (var i = 0; i < samples.length; i++) {
		samples[i] = (samples[i] - low) * scale + new_low
	}
	return {
		samples: samples,
		scale: scale
	}
}