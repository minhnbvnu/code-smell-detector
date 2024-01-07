function replace_color_globally(image_data, from_r, from_g, from_b, from_a, to_r, to_g, to_b, to_a) {
	if (
		from_r === to_r &&
		from_g === to_g &&
		from_b === to_b &&
		from_a === to_a
	) {
		return;
	}
	const { data } = image_data;
	for (let i = 0; i < data.length; i += 4) {
		if (
			Math.abs(data[i + 0] - from_r) <= fill_threshold &&
			Math.abs(data[i + 1] - from_g) <= fill_threshold &&
			Math.abs(data[i + 2] - from_b) <= fill_threshold &&
			Math.abs(data[i + 3] - from_a) <= fill_threshold
		) {
			data[i + 0] = to_r;
			data[i + 1] = to_g;
			data[i + 2] = to_b;
			data[i + 3] = to_a;
		}
	}
}